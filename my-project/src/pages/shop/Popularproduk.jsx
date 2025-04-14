import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";

const Popularproduk = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:6001/menu")
      .then((res) => res.json())
      .then((data) => {
        // Ambil hanya 3 produk pertama
        setPopularProducts(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-[#FE8A8A] text-center mb-2">
          Pesta Diskon Kue Pilihan
        </h2>
        <p className="text-[#FE8A8A] text-center mb-12">
          Maniskan harimu dengan diskon spesial!
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {popularProducts.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popularproduk;
