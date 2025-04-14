import React, { useState } from 'react';
import { FaUserGroup, FaMoneyBillWave } from 'react-icons/fa6';
import { TiShoppingCart } from 'react-icons/ti';
import { BsCake2Fill } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import Pemasukan from './Pemasukan'; // Komponen untuk pendapatan dan pesanan

const Dashboard = () => {
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [jumlahPesanan, setJumlahPesanan] = useState(0);

  const axiosSecure = useAxiosSecure();
  const [menu] = useMenu(); // Ambil data menu
  const jumlahStok = menu.length; // Hitung jumlah stok produk

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const totalUsers = users.length;

  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);
  const formattedTime = today.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const userName = localStorage.getItem('userName') || 'Pengguna';
  const userPhoto = localStorage.getItem('userPhoto');

  const stats = [
    { label: 'Jumlah Pengguna', value: totalUsers, color: 'bg-[#FE8A8A] text-white', icon: <FaUserGroup /> },
    { label: 'Total Pendapatan', value: `Rp ${totalPemasukan.toLocaleString('id-ID')}`, color: 'bg-[#FE8A8A] text-white', icon: <FaMoneyBillWave /> },
    { label: 'Jumlah Pesanan', value: jumlahPesanan, color: 'bg-[#FE8A8A] text-white', icon: <TiShoppingCart /> },
    { label: 'Stok Produk', value: jumlahStok, color: 'bg-[#FE8A8A] text-white', icon: <BsCake2Fill /> },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 py-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">{formattedDate} | {formattedTime}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">{userName}</span>
          {userPhoto ? (
            <img
              src={userPhoto}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
            />
          ) : (
            <div className="bg-purple-200 text-purple-800 w-10 h-10 flex items-center justify-center rounded-full font-bold">
              {userName?.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100% p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center mb-10 text-white">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2 text-white">Hai, {userName}</h2>
          <p className="text-white">Siap memulai hari dengan beberapa laporan?</p>
        </div>
        <img src="/img/adminfoto.png" alt="Dashboard Art" className="w-40 md:w-68" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((item, index) => (
    <div
      key={index}
      className={`rounded-xl shadow-md p-5 flex flex-col gap-2 justify-center ${item.color} min-w-[220px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg`}
    >
      <div className="text-3xl">{item.icon}</div>
      <h3 className="text-xl font-bold">{item.value}</h3>
      <p className="text-sm">{item.label}</p>
    </div>
  ))}
</div>




      <Pemasukan 
        onTotalPemasukanChange={setTotalPemasukan}
        onJumlahPesananChange={setJumlahPesanan}
        hiddenTable={true}
      />
    </div>
  );
};

export default Dashboard;
