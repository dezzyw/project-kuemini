import React from "react";
import { useNavigate } from "react-router-dom";

const ProdukPopuler = () => {
  const navigate = useNavigate();

  const products = [
    {
      img: "/img/bento cake profile.png",
      title: "Bento Cake (10×6 cm)",
      desc: "Bento cake adalah kue mini yang biasanya berukuran kecil, sekitar 4 hingga 6 inci, dan dirancang untuk porsi individu atau dua orang.",
      category: "bento",
    },
    {
      img: "/img/cake 14x6.png",
      title: "Cake (14×6 cm)",
      desc: "Kue mini dengan ukuran 14×6 cm biasanya dikenal sebagai kue loaf mini atau kue kecil berbentuk bulat atau persegi panjang.",
      category: "cake",
    },
    {
      img: "/img/half cake.png",
      title: "Half Cake",
      desc: "Half cake adalah kue yang berbentuk setengah lingkaran, seperti kue bulat yang dipotong menjadi dua bagian.",
      category: "half",
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/produk?category=${category}`);
  };

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <h2 className="text-4xl font-bold mb-2 text-[#FE8A8A]">Produk Populer</h2>
        <p className="text-center text-[#FE8A8A] mb-10">Temukan apa yang dikatakan pengguna lain!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#FE8A8A] rounded-2xl shadow-lg p-6 max-w-[360px] mx-auto text-white flex flex-col items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm mt-2">{product.desc}</p>
              <button
                className="mt-4 px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-[#FE8A8A] transition"
                onClick={() => handleNavigate(product.category)}
              >
                Selengkapnya
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdukPopuler;
