import React from "react";

const About = () => {
  return (
    <div className="section-container bg-white">
      <div className="py-24 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Bagian Teks */}
        <div className="md:w-1/2 px-4 flex flex-col items-center space-y-4">
          <h2 className="text-4xl font-bold text-[#FE8A8A] text-center mb-8">Tentang Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di Kue Mini! Kami adalah toko kue yang menghadirkan aneka kue lezat 
            dengan bahan berkualitas dan resep penuh cinta.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Mulai dari kue ulang tahun hingga camilan harian, setiap produk kami dibuat untuk menyempurnakan 
            momen spesial Anda. Kami juga melayani kustomisasi kue sesuai keinginan Anda. Mari ciptakan kenangan 
            manis bersama kami!
          </p>
        </div>

        {/* Bagian Gambar */}
        <div className="md:w-1/2 flex justify-center transform transition-transform duration-300 hover:scale-105">
          <img
            src="/img/about.png" // Pastikan file gambar ada di /public/img/about.png
            alt="Tentang Kami"
            className="max-w-full h-auto w-80 md:w-96 lg:w-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
