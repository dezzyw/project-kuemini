import React, { useContext, useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const api = import.meta.env.VITE_API;
  const secret = import.meta.env.VITE_SECRET;
  const clientKey = import.meta.env.VITE_CLIENT_KEY;

  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  // Update formData ketika user tersedia
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);
  

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(angka)
      .replace(/\./g, ",");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePaymentLink = async (customer) => {
    try {
      const encodedSecret = btoa(secret);
      const basicAuth = `Basic ${encodedSecret}`;
  
      // Pisah nama depan dan belakang (opsional kalau kamu ga punya last name)
      const nameParts = customer.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  
      const data = {
        item_details: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        transaction_details: {
          order_id: "order-" + Date.now(),
          gross_amount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        },
        customer_details: {
          first_name: firstName,
          last_name: lastName,
          email: customer.email,
          phone: customer.phone,
          billing_address: {
            address: customer.address || "Tidak ada alamat",
          },
        },
      };
  
      const response = await fetch(`${api}/v1/payment-links`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        body: JSON.stringify(data),
      });
  
      const paymentLink = await response.json();
  
      if (paymentLink.payment_url) {
        Swal.fire({
          title: "Link Pembayaran Dibuat",
          html: `
            <p>Silakan klik link di bawah untuk lanjut ke pembayaran:</p>
            <a href="${paymentLink.payment_url}" target="_blank" class="text-blue-500 underline">
              ${paymentLink.payment_url}
            </a>
          `,
          icon: "success",
          confirmButtonText: "Tutup",
        });
      } else {
        throw new Error("Gagal mendapatkan link pembayaran.");
      }
    } catch (error) {
      console.error("Error saat generate link pembayaran:", error);
      Swal.fire({
        title: "Terjadi Kesalahan",
        text: error.message || "Gagal membuat link pembayaran.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  };
  

  const checkoutProduct = async () => {
    if (!cart || cart.length === 0) {
      Swal.fire("Keranjang kosong!", "Silakan tambahkan produk sebelum checkout.", "warning");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      Swal.fire("Lengkapi Data!", "Harap isi semua detail pelanggan sebelum checkout.", "warning");
      return;
    }

    await generatePaymentLink(formData);
    await clearCart();
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(`http://localhost:6001/carts/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        });
        const data = await response.json();
        if (data.modifiedCount > 0) refetch();
      } catch (error) {
        console.error("Gagal mengurangi jumlah item:", error);
      }
    } else {
      Swal.fire("Peringatan!", "Jumlah item tidak boleh kurang dari 1", "warning");
    }
  };

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });
      const data = await response.json();
      if (data.modifiedCount > 0) refetch();
    } catch (error) {
      console.error("Gagal menambah jumlah item:", error);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Item akan dihapus dari keranjang!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success || data.affectedRows > 0 || data.message?.toLowerCase().includes("deleted")) {
              Swal.fire("Dihapus!", "Item berhasil dihapus.", "success").then(() => refetch());
            } else {
              Swal.fire("Gagal!", "Item tidak ditemukan atau gagal dihapus.", "error");
            }
          })
          .catch((error) => {
            console.error("Gagal menghapus item:", error);
            Swal.fire("Error!", "Terjadi kesalahan saat menghapus item.", "error");
          });
      }
    });
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`http://localhost:6001/carts/clear/${user.email}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
      if (result.success || result.acknowledged || result.deletedCount > 0) {
        refetch(); // Refresh data cart setelah dikosongkan
      }
    } catch (error) {
      console.error("Gagal mengosongkan keranjang:", error);
    }
  };
  

  const cartSubTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="section-container">
      <div className="bg-white flex flex-col items-center justify-center mt-48 mb-20">
        <h2 className="md:text-5xl text-4xl md:leading-snug leading-snug">
          Keranjang <span className="text-[#FE8A8A] font-bold">Milik Saya</span>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-[#FE8A8A] text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Gambar</th>
              <th>Nama Produk</th>
              <th>Qty</th>
              <th>Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.image} alt={item.name} width="40" height="16" />
                </td>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-xs" onClick={() => handleDecrease(item)}>
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly className="w-10 mx-2 text-center appearance-none" />
                  <button className="btn btn-xs" onClick={() => handleIncrease(item)}>
                    +
                  </button>
                </td>
                <td>{formatRupiah(item.price * item.quantity)}</td>
                <td>
                  <button className="btn btn-ghost text-[#d33] btn-xs" onClick={() => handleDelete(item)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-12">
        <h2 className="font-large mb-4">Detail Pembeli</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="No HP"
            value={formData.phone}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
          <textarea
            name="address"
            placeholder="Alamat Lengkap"
            value={formData.address}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full col-span-2"
          />
        </div>
      </div>

      <div className="my-12 flex flex-col md:flex-row justify-end">
        <div className="w-full md:w-1/2 text-right space-y-4">
          <h3 className="font-bold text-xl">Detail Pesanan</h3>
          <p className="text-gray-700">Total Items: {cart.length}</p>
          <p className="text-gray-700">Total Price: {formatRupiah(cartSubTotal)}</p>
          <button
            className="btn bg-[#FE8A8A] text-white px-6 py-2 rounded-lg"
            disabled={!user}
            onClick={checkoutProduct}
          >
            {user ? "Bayar" : "Login Dulu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
