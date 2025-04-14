import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";

// Format harga ke mata uang Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const Cards = ({ item }) => {
  const { name, image, price, recipe, id, oldPrice, discount } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      if (!item.id || !item.name || !item.price || !item.image) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Data produk tidak lengkap",
          showConfirmButton: true,
        });
        return;
      }

      const cartItem = {
        id: item.id,
        name: item.name,
        quantity: 1,
        image: item.image,
        price: parseInt(item.price, 10),
        email: user.email,
      };

      fetch("http://localhost:6001/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil ditambahkan ke Keranjang!",
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Gagal menambahkan ke keranjang",
              text: `${data.message || "Terjadi kesalahan"}`,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Kesalahan Server",
            text: error.message,
            showConfirmButton: true,
          });
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Silakan login dahulu",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative p-6 transform hover:scale-105 mb-5">
      {/* Gambar Produk */}
      <div className="relative w-full h-[300px] mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Badge Diskon */}
        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            {discount}
          </span>
        )}

        {/* Tombol Favorit */}
        <button
          className="absolute top-3 right-3 bg-[#FE8A8A] p-2 rounded-lg text-white shadow-md"
          onClick={() => setIsHeartFilled(!isHeartFilled)}
        >
          <FaHeart className={`w-5 h-5 ${isHeartFilled ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Detail Produk */}
      <div>
        <Link to={`/menu/${id}`}>
          <h2 className="text-lg font-semibold text-[#FE8A8A] mb-2">{name}</h2>
        </Link>
        <p className="text-gray-500 mb-4">{recipe}</p>

        {/* Harga & Tombol Keranjang */}
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-semibold text-[#FE8A8A]">
              {formatRupiah(price)}
            </h5>
            {oldPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatRupiah(oldPrice)}
              </p>
            )}
          </div>
          <button
            className="bg-[#FE8A8A] p-3 rounded-lg text-white shadow-md"
            onClick={() => handleAddtoCart(item)}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
