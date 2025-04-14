import React from 'react'

const BlogSatu = () => {
    return (
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg max-w-6xl mx-auto mt-40">
          {/* Gambar */}
          <div className="w-full md:w-1/2 h-72 md:h-auto">
            <img
              src="public\img\image.png" // Ganti dengan path gambar yang sesuai
              alt="Cupcake"
              className="w-full h-full object-cover"
            />
          </div>
    
          {/* Konten */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100% text-white p-6 md:p-10 flex flex-col justify-center">
            <p className="text-sm mb-2">21 Januari 2025</p>
            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
              Mengenal Dunia Kue: <br />
              Lezatnya Cita Rasa dalam <br />
              Setiap Gigitan
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Siapa yang tidak tergoda oleh aroma kue yang baru keluar dari oven?
              Tekstur lembut, rasa manis yang pas, dan tampilan yang menggoda
              menjadikan kue sebagai sajian istimewa yang sulit ditolak.
            </p>
          </div>
        </div>
      )
}

export default BlogSatu