import React, { useState } from "react";

const Workshop = () => {
  const slides = [
    {
      image: "/img/workshop baru.png",
      title: "WORKSHOP KUE MINI",
      description:
        "Pernahkah Anda membayangkan membuat kue-kue mini yang cantik dan menggoda? Dalam workshop ini, kami mengajak Anda untuk berkreasi dengan kue mini yang bisa menjadi peluang bisnis kuliner atau sekadar hobi yang menyenangkan.",
    },
    {
      image: "/img/workshop2.png",
      title: "BELAJAR LANGSUNG DARI AHLINYA",
      description:
        "Dipandu oleh pastry chef berpengalaman, Anda akan belajar teknik dasar hingga lanjutan dalam menghias dan membentuk kue mini yang menarik.",
    },
    {
      image: "/img/workshopcupcake.png",
      title: "PRAKTIK SERU DAN HASIL BISA DIBAWA PULANG!",
      description:
        "Tidak hanya teori, workshop ini berisi praktik langsung yang menyenangkan. Semua hasil karya Anda bisa dibawa pulang dan dinikmati bersama keluarga.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#FE8A8A] to-[#FFDCD9] py-10">
      <div className="relative w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {slides[currentIndex].title}
          </h1>
          <p className="text-lg max-w-2xl italic">
            {slides[currentIndex].description}
          </p>
        </div>

        {/* Tombol Navigasi */}
        <button
          onClick={prevSlide}
          className="absolute left-2 inset-y-1/2 transform -translate-y-1/2 p-2 hover:bg-opacity-80 transition"
        >
          <img src="/img/arrowleft.png" alt="Previous" className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 inset-y-1/2 transform -translate-y-1/2 p-2 hover:bg-opacity-80 transition"
        >
          <img src="/img/arrowright.png" alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Workshop;
