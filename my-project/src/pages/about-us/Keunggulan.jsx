import React from "react";
import { FaHeart, FaMoneyBillWave, FaShippingFast } from "react-icons/fa";

const Keunggulan = () => {
  return (
    <div className="bg-white pt-20 pb-20">
      {/* Container utama dengan lebar maksimal 6xl, center, dan padding horizontal 1rem */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#FE8A8A] text-center mb-2">
          Keunggulan Kami
        </h2>
        <p className="text-[#FE8A8A] text-center mb-10">
          Maniskan harimu dengan diskon spesial!
        </p>
        
        {/* Grid 3 kolom di layar md ke atas, 1 kolom di layar kecil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Kartu 1 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaHeart className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Bahan Berkualitas</h3>
            <p className="text-sm">
              Kami hanya menggunakan bahan pilihan terbaik, seperti mentega asli, 
              cokelat premium, dan buah segar untuk menghasilkan kue yang istimewa.
            </p>
          </div>
          
          {/* Kartu 2 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaMoneyBillWave className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
            <p className="text-sm">
              Kami percaya bahwa kue lezat harus bisa dinikmati semua orang, 
              karenanya kami menawarkan harga terbaik tanpa kompromi kualitas.
            </p>
          </div>
          
          {/* Kartu 3 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaShippingFast className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat & Aman</h3>
            <p className="text-sm">
              Tinggal klik pesan, dan nikmati! Kami menyediakan layanan pengiriman 
              cepat serta aman, langsung ke lokasi Anda.
            </p>
          </div>
          
          {/* Kartu 4 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaHeart className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Bahan Berkualitas</h3>
            <p className="text-sm">
              Kami hanya menggunakan bahan pilihan terbaik, seperti mentega asli, 
              cokelat premium, dan buah segar untuk menghasilkan kue yang istimewa.
            </p>
          </div>
          
          {/* Kartu 5 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaMoneyBillWave className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
            <p className="text-sm">
              Kami percaya bahwa kue lezat harus bisa dinikmati semua orang, 
              karenanya kami menawarkan harga terbaik tanpa kompromi kualitas.
            </p>
          </div>
          
          {/* Kartu 6 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaShippingFast className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat & Aman</h3>
            <p className="text-sm">
              Tinggal klik pesan, dan nikmati! Kami menyediakan layanan pengiriman 
              cepat serta aman, langsung ke lokasi Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keunggulan;
