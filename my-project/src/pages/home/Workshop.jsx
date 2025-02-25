import React, { useState } from "react";

const Workshop = () => {
  const images = [
    "/img/workshop baru.png",
    "/img/workshop2.png",
    "/img/workshopcupcake.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100% py-10">
      <div className="relative w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Workshop Kue Mini"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-6 text-white">
          <h1 className="text-5xl font-bold mb-3">WORKSHOP</h1>
          <p className="text-lg max-w-2xl italic">
            Pernahkah Anda membayangkan membuat kue-kue mini yang cantik dan menggoda? Dalam workshop ini, kami mengajak Anda
            untuk berkreasi dengan kue mini yang bisa menjadi peluang bisnis kuliner atau sekadar hobi yang menyenangkan.
          </p>
        </div>

        {/* Tombol Navigasi */}
        <button 
          onClick={prevSlide} 
          className="absolute left-2 inset-y-1/2 transform -translate-y-1/2 p-2  hover:bg-opacity-80 transition">
          <img src="/img/arrowleft.png" alt="Previous" className="w-6 h-6" />
        </button>

        <button 
          onClick={nextSlide} 
          className="absolute right-2 inset-y-1/2 transform -translate-y-1/2 p-2  hover:bg-opacity-80 transition">
          <img src="/img/arrowright.png" alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Workshop;
