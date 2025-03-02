import React from 'react';
import {
  FaTruck,
  FaStore,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

// Deklarasi data produk
const products = [
  {
    id: 1,
    discount: "20%",
    img: "/img/rose-white.png",
    title: "Rose White's",
    desc: "Bento Cake (10 x 6 cm)",
    price: "Rp 50.000",
    oldPrice: "Rp 70.000",
  },
  {
    id: 2,
    discount: "25%",
    img: "/img/kelinci-half.png",
    title: "Strawberry Lover",
    desc: "Cake (14 x 6 cm)",
    price: "Rp 75.000",
    oldPrice: "Rp 100.000",
  },
  {
    id: 3,
    discount: "30%",
    img: "/img/popy-nangis.png",
    title: "Half Cake",
    desc: "Half Cake",
    price: "Rp 100.000",
    oldPrice: "Rp 120.000",
  },
];

const Popularproduk = () => {
  return (
    // Bungkus seluruh halaman dengan latar belakang putih
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFFF] py-10 px-4 rounded-xl max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#FE8A8A] mb-2 mt-20 text-center">
          Pesta Diskon Kue Pilihan
        </h2>
        <p className="text-[#FE8A8A] text-center mb-20">
          Maniskan harimu dengan diskon spesial!
        </p>

        <div className="relative flex items-center justify-center">
          {/* Tombol Panah Kiri */}
          <button className="absolute left-0 p-3 bg-white rounded-full shadow hidden md:block">
            <FaChevronLeft className="text-pink-600" />
          </button>

          {/* Grid Kartu Diskon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-8 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow p-5 rounded-lg relative transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Label Diskon di pojok kiri atas */}
                <span className="absolute top-8 left-8 bg-[#FFFF] text-[#FE8A8A] text-xs px-2 py-1 rounded-full">
                  {product.discount}
                </span>

                {/* Gambar */}
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-lg"
                />

                {/* Info Produk */}
                <h3 className="mt-4 text-lg font-semibold text-[#FE8A8A]">
                  {product.title}
                </h3>
                <p className="text-sm text-[#FE8A8A]">{product.desc}</p>

                {/* Harga Baru & Lama + Ikon Keranjang */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[#FE8A8A] font-bold mr-2">
                      {product.price}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      {product.oldPrice}
                    </span>
                  </div>
                  {/* Ikon Keranjang */}
                  <FaShoppingCart className="text-[#FE8A8A] hover:text-gray-400 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Panah Kanan */}
          <button className="absolute right-4 p-3 bg-white rounded-full shadow hidden md:block">
            <FaChevronRight className="text-pink-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popularproduk;
