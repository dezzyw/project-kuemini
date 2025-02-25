import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import '../App.css';

export default function Footer() {
  return (
    <footer className="bg-[#FE8A8A] text-white p-10">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-6">
        
        {/* Kolom 1: Logo + Deskripsi + Sosial Media */}
        <aside className="w-full md:w-1/3 min-w-[250px]">
          <img
            src="/LOGO.png"
            alt="Mini Cake Logo"
            width="150"
            height="50"
            className="mb-4"
          />
          <p className="text-lg">
            Setiap kue dibuat dengan cinta, menghadirkan rasa <br />
            manis yang sempurna di setiap gigitan.
          </p>
          <div className="flex gap-4 mt-4 text-2xl">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </aside>

        {/* Kolom 2: Produk */}
        <nav className="w-full md:w-1/5 min-w-[100px] flex flex-col gap-2">
          <h6 className="text-lg font-bold mb-1">Produk</h6>
          <a className="hover:underline">Bento Cake</a>
          <a className="hover:underline">Cake</a>
          <a className="hover:underline">Half Cake</a>
        </nav>

        {/* Kolom 3: Bantuan */}
        <nav className="w-full md:w-1/5 min-w-[100px] flex flex-col gap-2">
          <h6 className="text-lg font-bold mb-1">Bantuan</h6>
          <a className="hover:underline">Pusat Bantuan</a>
          <a className="hover:underline">Hubungi Kami</a>
          <a className="hover:underline">Laporkan Bug</a>
        </nav>

        {/* Kolom 4: Kontak Kami */}
        <nav className="w-full md:w-1/5 min-w-[100px] flex flex-col gap-2">
          <h6 className="text-lg font-bold mb-1">Kontak Kami</h6>
          <p className="flex items-center gap-2">
            <FaEnvelope /> kuemini@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaPhone /> +62 821-3685-1625
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Jl. Raya Dukuhwaluh, Dusun I, Karangsoka,
            <br />
            Kembaran, Banyumas, Jawa Tengah 53182
          </p>
        </nav>
      </div>

      {/* Garis Bawah + Copyright */}
      <div className="w-full text-center mt-10 border-t border-white pt-3">
        <p>Copyright © 2025 Kue Mini</p>
      </div>
    </footer>
  );
}
