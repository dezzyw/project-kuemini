import React from "react";
import { FaHeart, FaMoneyBillWave, FaShippingFast, FaSmile, FaLeaf, FaStar } from "react-icons/fa";

const Keunggulan = () => {
  return (
    <div className="bg-white pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#FE8A8A] text-center mb-2">
          Keunggulan Kami
        </h2>
        <p className="text-[#FE8A8A] text-center mb-10">
          Maniskan harimu dengan diskon spesial!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kartu 1 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaHeart className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Cinta Dalam Setiap Gigitan</h3>
            <p className="text-sm">
              Setiap kue kami dibuat dengan penuh cinta dan perhatian, memberikan rasa yang tak hanya lezat tapi juga hangat di hati.
            </p>
          </div>

          {/* Kartu 2 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaMoneyBillWave className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
            <p className="text-sm">
              Kami menghadirkan produk premium dengan harga bersahabat agar siapa pun bisa menikmati kualitas tanpa khawatir biaya.
            </p>
          </div>

          {/* Kartu 3 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaShippingFast className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat & Aman</h3>
            <p className="text-sm">
              Kami menjamin pesanan Anda sampai dengan cepat dan dalam kondisi terbaik, langsung ke depan pintu rumah.
            </p>
          </div>

          {/* Kartu 4 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaSmile className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Pelayanan Ramah</h3>
            <p className="text-sm">
              Kepuasan pelanggan adalah prioritas kami. Tim kami siap melayani dengan sepenuh hati dan senyum tulus.
            </p>
          </div>

          {/* Kartu 5 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaLeaf className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Tanpa Bahan Pengawet</h3>
            <p className="text-sm">
              Kami menjaga kesehatan pelanggan dengan tidak menggunakan bahan kimia berbahaya atau pengawet buatan.
            </p>
          </div>

          {/* Kartu 6 */}
          <div className="bg-[#FE8A8A] text-white p-6 rounded-lg shadow transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaStar className="text-3xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Kualitas Bintang Lima</h3>
            <p className="text-sm">
              Rasa, tampilan, dan pelayanan kami dibuat dengan standar tinggi untuk memberikan pengalaman premium di setiap pesanan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Keunggulan;
