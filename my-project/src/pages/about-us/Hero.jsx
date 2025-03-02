import React from "react";

const Hero = () => {
  return (
    <div className="bg-white">
    <div className="max-w-6xl mx-auto px-4 pt-40 pb-30">
      <div className="relative bg-[#FE8A8A] rounded-xl overflow-hidden h-[300px] md:h-[400px]">
        {/* Gambar latar (opsional), dengan opacity */}
        <img
          src="img/heroimg.png"
          alt="Hero Cake"
          className="absolute inset-0 object-cover w-400 h- opacity-40"
        />

        {/* Overlay pink, jika ingin menambah lapisan warna */}
        <div className="absolute inset-0 bg-[#FE8A8A] mix-blend-multiply opacity-10"></div>

        {/* Konten teks */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="max-w-2xl text-sm md:text-base">
            Manisnya kebahagiaan dimulai dari sini! Kami hadir untuk menghadirkan kue-kue lezat 
            yang bukan hanya mengunggah selera, tetapi juga menciptakan momen berharga dalam hidup Anda. 
            Dari kue klasik hingga kreasi spesial, setiap sajian kami dibuat dengan bahan berkualitas 
            dan sentuhan cinta.
          </p>
        </div>

      </div>
    </div>
    </div>
  );
};

export default Hero;
