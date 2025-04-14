const Midtrans = require("midtrans-client");
const Transaction = require("../models/Transaction"); // Sequelize model
const crypto = require('crypto');


// Midtrans Snap for createTransaction
const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
});

// Midtrans CoreApi for notification handling
const core = new Midtrans.CoreApi({
  isProduction: false,
  serverKey: process.env.NEXT_PUBLIC_SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
});

// 👉 Create Payment & save pending order to DB
const createPayment = async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ error: "Cart is empty" });

    if (!customer?.name || !customer?.email || !customer?.phone)
      return res.status(400).json({ error: "Customer details are required" });

    const [firstName, ...lastParts] = customer.name.split(" ");
    const lastName = lastParts.join(" ");
    const orderId = `ORDER-${Date.now()}`;
    const grossAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Pastikan email ada di request body
    if (!customer.email) {
      return res.status(400).json({ error: "Customer email is required" });
    }

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: customer.email,  // Email pelanggan
        phone: customer.phone,
        billing_address: {
          address: customer.address || "No Address"
        },
        shipping_address: {
          address: customer.address || "No Address"
        }
      },
      metadata: {
        extra_info: {
          customer_email: customer.email  // Menambahkan email ke metadata
        }
      }
    };
    

    const transaction = await snap.createTransaction(parameter);

    // ⏺️ Save initial transaction to DB
    const newTransaction = await Transaction.create({
      orderId,
      transactionStatus: "pending",
      paymentType: "bank_transfer", // default
      grossAmount,
      transactionTime: new Date(),
      customerEmail: customer.email  // Pastikan email ada di database
    });

    console.log("📝 Transaction created in DB:", newTransaction);

    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url
    });
  } catch (err) {
    console.error("🔥 Error creating payment:", err);
    res.status(500).json({ error: "Failed to create payment" });
  }
};


// 👉 Handle Midtrans Notification
// 👉 Handle Midtrans Notification
const handleMidtransNotification = async (req, res) => {
  const notif = req.body;
  console.log("📥 Midtrans Notification received:", JSON.stringify(notif, null, 2));

  try {
    const {
      order_id,
      transaction_status,
      payment_type,
      gross_amount,
      transaction_time,
      signature_key,
      status_code,
    } = notif;

    // 🔐 Verifikasi Signature Key
    const serverKey = process.env.NEXT_PUBLIC_SECRET;
    const rawSignature = order_id + status_code + gross_amount + serverKey;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(rawSignature)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error("❌ Signature tidak valid! Notifikasi ditolak.");
      return res.status(403).send("Invalid signature");
    }

    // 📡 Ambil status terbaru dari Midtrans
    const statusResponse = await core.transaction.notification(notif);
    console.log("📊 Midtrans Status Response:", JSON.stringify(statusResponse, null, 2));

    const {
      transaction_status: status,
      payment_type: payment,
      gross_amount: amount,
      transaction_time: time,
      order_id: midtransOrderId,
      customer_details
    } = statusResponse;

    const customerEmail = notif?.metadata?.extra_info?.customer_email;
    console.log("Customer Email:", customerEmail); // Pastikan email ada di sini


    // 🔍 Cari transaksi di database
    const existingTransaction = await Transaction.findOne({
      where: { orderId: midtransOrderId }
    });

    if (!existingTransaction) {
      // ⏺️ Kalau transaksi tidak ada, dan ini dari Payment Link, simpan ke DB
      const isFromPaymentLink = notif?.metadata?.extra_info?.payment_link_id;

      if (isFromPaymentLink) {
        const newTransaction = await Transaction.create({
          orderId: midtransOrderId,
          transactionStatus: status,
          paymentType: payment,
          grossAmount: amount,
          transactionTime: time,
          customerEmail
        });

        console.log(`🆕 Disimpan transaksi dari Payment Link: ${midtransOrderId}`);
        return res.status(200).send("Payment Link transaction saved");
      }

      console.warn(`⛔ Dilewati: Transaksi tidak ditemukan di database: ${midtransOrderId}`);
      return res.status(200).send("Skipped unknown transaction");
    }

    // 💾 Update status transaksi
    await Transaction.update(
      {
        transactionStatus: status,
        paymentType: payment,
        grossAmount: amount,
        transactionTime: time,
        customerEmail // Bisa update juga kalau perlu
      },
      {
        where: { orderId: midtransOrderId }
      }
    );

    console.log(`✅ Transaksi berhasil diupdate: ${midtransOrderId} → ${status}`);

    // Update email jika ada di metadata
    if (customerEmail) {
      // Update transaksi di database dengan email
      await Transaction.update(
        { customerEmail: customerEmail },
        { where: { orderId: midtransOrderId } }
      );
      console.log(`✅ Email berhasil diperbarui untuk transaksi ${midtransOrderId}`);
    }

    return res.status(200).send("OK");

  } catch (err) {
    console.error("🔥 Gagal memproses notifikasi Midtrans:", err);
    return res.status(500).send("Internal Server Error");
  }
};




const saveCustomerEmail = async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId || !email) return res.status(400).json({ error: "Missing orderId or email" });

    // Pastikan email diperbarui di database
    const [updated] = await Transaction.update(
      { customerEmail: email },
      { where: { orderId } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Order ID not found" });
    }

    console.log(`✏️ Email updated for order ${orderId}: ${email}`);
    return res.json({ success: true });
  } catch (err) {
    console.error("🔥 Error updating email:", err);
    return res.status(500).json({ error: "Failed to update email" });
  }
};

// GET all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['transactionTime', 'DESC']]
    });
    res.json(transactions);
  } catch (error) {
    console.error("🔥 Gagal mengambil transaksi:", error);
    res.status(500).json({ error: "Gagal mengambil data transaksi" });
  }
};




module.exports = { createPayment, handleMidtransNotification, saveCustomerEmail, getAllTransactions };
