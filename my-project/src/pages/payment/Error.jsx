import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: '#FF6B6B' }} // merah soft
    >
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <div className="text-red-600 text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-semibold mb-2">Pembayaran Gagal</h1>
        <p className="text-gray-600 mb-6">Terjadi kesalahan saat memproses pembayaran kamu. Silakan coba lagi atau hubungi dukungan.</p>
        <Link
          to="/cart-page"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-200"
        >
          Kembali ke Keranjang
        </Link>
      </div>
    </div>
  );
};

export default Error;
