import React, { useContext, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);

  // Load Midtrans Snap.js sekali saat komponen pertama kali dirender
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.NEXT_PUBLIC_CLIENT);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka).replace(/\./g, ",");
  };

  const checkoutProduct = async () => {
    if (!cart || cart.length === 0) {
        Swal.fire("Keranjang kosong!", "Silakan tambahkan produk sebelum checkout.", "warning");
        return;
    }

    const checkoutData = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        }))
    };

    console.log("🔍 Checkout Data:", checkoutData); // Debugging

    try {
        const response = await fetch("http://localhost:6001/payment/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkoutData),
        });

        const requestData = await response.json();
        console.log("📌 Midtrans Token Response:", requestData); // Debugging

        if (requestData.token) {
            window.snap.pay(requestData.token);
        } else {
            throw new Error(requestData.error || "Gagal mendapatkan token Midtrans");
        }
    } catch (error) {
        console.error("❌ Error saat checkout:", error);
    }
};


  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-white py-36 flex flex-col items-center justify-center gap-8">
        <h2 className="md:text-5xl text-4xl md:leading-snug leading-snug">
          Items Added to The <span className="text-[#FE8A8A] font-bold">Cart</span>
        </h2>
      </div>

      {/* Tabel keranjang */}
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
                <td><img src={item.image} alt={item.name} width="50" height="50" /></td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{formatRupiah(item.price * item.quantity)}</td>
                <td><FaTrash className="text-[#d33] cursor-pointer" onClick={() => handleDelete(item)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total & Checkout */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2">
          <h3 className="font-medium">Customer Details</h3>
          {user ? <p>{user.displayName || "Guest"}</p> : <p>Silakan login.</p>}
        </div>
        <div className="md:w-1/2">
          <h3 className="font-medium">Total Price: {formatRupiah(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</h3>
          <button className="btn bg-[#FE8A8A] text-white" disabled={!user} onClick={checkoutProduct}>
            {user ? "Check Out" : "Login Dulu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
