import React from 'react'

const Journey = () => {
  return (
    <div className="bg-gradient-to-r from-[#FE8A8A] to-[#FFDCD9] py-10">
      <div className="max-w-6xl mx-auto px-4 py-40 flex flex-col md:flex-row gap-10 items-center">
        
        {/* Bagian Kiri: Kotak Statistik (2x2) */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* Kotak 1 */}
          <div className="bg-white p-6 rounded-lg shadow text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <p className="text-2xl font-bold text-[#FE8A8A]">350+</p>
            <p className="text-[#FE8A8A]">Produk Kue</p>
          </div>
          {/* Kotak 2 */}
          <div className="bg-white p-6 rounded-lg shadow text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <p className="text-2xl font-bold text-[#FE8A8A]">500K+</p>
            <p className="text-[#FE8A8A]">Pembeli</p>
          </div>
          {/* Kotak 3 */}
          <div className="bg-white p-6 rounded-lg shadow text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <p className="text-2xl font-bold text-[#FE8A8A]">50</p>
            <p className="text-[#FE8A8A]">Tim Produksi</p>
          </div>
          {/* Kotak 4 */}
          <div className="bg-white p-6 rounded-lg shadow text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <p className="text-2xl font-bold text-[#FE8A8A]">4.9</p>
            <p className="text-[#FE8A8A]">Rating</p>
          </div>
        </div>

        {/* Bagian Kanan: Teks */}
        <div className="flex-1 text-white">
          <h3 className="text-xl font-bold mb-2">Perjalanan Kami</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dipercaya oleh lebih dari 100K pembeli yang senang
          </h2>
          <p className="leading-relaxed">
            Dipercaya oleh lebih dari 500 ribu klien yang bahagia, 
            komitmen kami terhadap kepuasan bersinar melalui setiap kisah sukses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Journey