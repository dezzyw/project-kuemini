import React from 'react';
import { Link } from 'react-router-dom';

const Unfinished = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: '#FFD56B' }} // warna kuning lembut
    >
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold mb-2">Pembayaran Belum Selesai</h1>
        <p className="text-gray-600 mb-6">
          Kamu belum menyelesaikan pembayaran. Silakan lanjutkan proses atau kembali ke keranjang.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/checkout"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition duration-200"
          >
            Lanjutkan Pembayaran
          </Link>
          <Link
            to="/cart-page"
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-full transition duration-200"
          >
            Kembali ke Keranjang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unfinished;
