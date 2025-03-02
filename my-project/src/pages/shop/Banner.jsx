import React from 'react'
import {
    FaTruck,
    FaStore,
    FaChevronLeft,
    FaChevronRight,
    FaHeart,
    FaShoppingCart,
  } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100% py-10 px-4 mt-20">
          {/* ===== Banner Promo ===== */}
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden flex flex-col md:flex-row items-center shadow-lg">
            {/* Bagian Kiri (Teks Promo) */}
            <div className="w-full md:w-1/2 bg-pink-100 p-6 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Cintai Lebih Manis! <span role="img" aria-label="cake">🍰</span>
              </h2>
              <p className="text-white text-lg md:text-xl font-semibold">
                Diskon Spesial Valentine hingga
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-white mt-2">
                50%
              </p>
    
              {/* Info Ekstra (Gratis Ongkir, Diambil di Toko) */}
              <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-2 text-white">
                  <FaTruck />
                  <span className="font-medium">Gratis Ongkir</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <FaStore />
                  <span className="font-medium">Diambil di Toko</span>
                </div>
              </div>
    
              <p className="text-sm text-white mt-4">
                *Berlaku mulai 14 Februari s/d 17 Februari 2025
              </p>
            </div>
    
            {/* Bagian Kanan (Gambar) */}
            <div className="w-full md:w-1/2 bg-pink-50 p-6 md:p-10">
              <img
                src="/img/PROMO.png"
                alt="Valentine Cake"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
  )
}

export default Banner