import React from 'react';

const RiwayatPesanan = () => {
  // Sample orders
  const orders = [
    {
      id: 1,
      name: 'Pesanan 1',
      status: 'Belum Dibayar',
      date: '2025-04-10',
    },
    {
      id: 2,
      name: 'Pesanan 2',
      status: 'Proses',
      date: '2025-04-11',
    },
    {
      id: 3,
      name: 'Pesanan 3',
      status: 'Selesai',
      date: '2025-04-12',
    },
  ];

  return (
    <div className="p-10 bg-white">
      <h1 className="text-center text-2xl font-semibold mb-8 mt-40">Riwayat Pesanan</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{order.name}</h2>
              <span
                className={`px-4 py-2 text-sm font-semibold rounded-full ${
                  order.status === 'Belum Dibayar'
                    ? 'bg-red-100 text-red-600'
                    : order.status === 'Proses'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">Tanggal: {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiwayatPesanan;
