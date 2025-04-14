import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiMoon,
  FiLogOut,
} from 'react-icons/fi';

const Pengaturan = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Anda telah logout.");
    navigate("/login");
  };

  const settingItems = [
    {
      icon: <FiUser className="text-[#FE8A8A] w-5 h-5" />,
      label: 'Edit Profil',
      action: () => navigate('/update-profile'),
    },
    {
      icon: <FiLock className="text-[#FE8A8A] w-5 h-5" />,
      label: 'Ubah Password',
      action: () => alert("Fitur ubah password belum tersedia."),
    },
    {
      icon: <FiBell className="text-[#FE8A8A] w-5 h-5" />,
      label: 'Notifikasi',
      action: () => alert("Pengaturan notifikasi belum tersedia."),
    },
    {
      icon: <FiGlobe className="text-[#FE8A8A] w-5 h-5" />,
      label: 'Bahasa',
      action: () => alert("Fitur ganti bahasa belum tersedia."),
    },
    {
      icon: <FiMoon className="text-[#FE8A8A] w-5 h-5" />,
      label: 'Mode Gelap',
      action: () => alert("Mode gelap akan segera hadir."),
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8 mt-20 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Pengaturan Akun
        </h2>

        <ul className="space-y-4">
          {settingItems.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={item.action}
                className={`flex items-center w-full p-4 rounded-xl border border-gray-200 bg-white transition-all duration-200
                  ${item.textColor || 'text-gray-700 hover:text-[#FE8A8A] hover:border-[#FE8A8A]'}`}
              >
                <span className="mr-4">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pengaturan;
