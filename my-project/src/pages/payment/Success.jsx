import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FE8A8A] bg-opacity-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-2">Pembayaran Berhasil!</h1>
        <p className="text-gray-600 mb-6">Terima kasih atas pesanan kamu. Kami akan segera memprosesnya.</p>
        <Link
          to="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default Success;
