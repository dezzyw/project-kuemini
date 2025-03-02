import React from "react";

const Deskripsi = () => {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-40 pt-30 text-gray-700 leading-relaxed">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Gambar Kue */}
          <img
            src="/img/tentangkami.png" // Pastikan file ada di public/img/
            alt="Kue Mini"
            className="w-full md:w-1/3 object-cover rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          />
          {/* Konten Teks */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Selamat datang di Kue Mini!
            </h2>
            <p className="mb-4">
              Kami adalah toko kue yang menghadirkan aneka kue lezat dengan bahan berkualitas
              dan resep penuh cinta. Mulai dari kue ulang tahun hingga camilan harian, setiap
              produk kami dibuat untuk menyempurnakan momen spesial Anda. Kami juga melayani
              kustomisasi kue sesuai keinginan Anda. Mari ciptakan kenangan manis bersama kami!
            </p>
            <p>
              Dengan tekstur lembut, rasa yang menggoda, dan tampilan yang cantik, setiap kue
              dari Kue Mini siap membawa kebahagiaan di setiap gigitan. Kami percaya bahwa setiap
              momen pantas dirayakan dengan kelezatan terbaik. Mari ciptakan kenangan manis
              bersama kami! <span role="img" aria-label="cake">🍰</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deskripsi;
