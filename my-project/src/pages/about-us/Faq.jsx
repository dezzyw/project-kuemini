import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Apakah Tersedia Layanan Pengiriman?",
    answer: "Ya! Kami menyediakan layanan pengiriman ke area tertentu. Silakan cek jangkauan pengiriman kami saat melakukan pemesanan.",
  },
  {
    question: "Apakah Kue Di Sini Selalu Fresh?",
    answer: "Tentu saja! Kue kami dibuat setiap hari dengan bahan-bahan berkualitas untuk memastikan kesegaran dan rasa terbaik.",
  },
  {
    question: "Bagaimana Cara Memesan Kue?",
    answer: "Anda dapat memesan kue langsung melalui website kami atau menghubungi customer service kami untuk konsultasi dan pemesanan.",
  },
  {
    question: "Apakah Kue Bisa Dikirim Ke Luar Kota?",
    answer: "Bisa. Kami melayani pengiriman ke berbagai kota di Indonesia, tergantung jangkauan layanan pengiriman.",
  },
];

const Faq = () => {
  // Menyimpan indeks pertanyaan yang terbuka. null = tidak ada yang terbuka
  const [openIndex, setOpenIndex] = useState(null);

  // Fungsi toggle saat pertanyaan diklik
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-40">
        {/* Bagian Kiri: Judul & Deskripsi FAQ */}
        <div className="md:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FE8A8A] mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-[#FE8A8A]">
            Punya pertanyaan seputar pemesanan, pengiriman, atau kue spesial kami?
            Kami sudah menyiapkan jawaban untuk membantu Anda! Jika masih ada yang
            ingin ditanyakan, jangan ragu untuk menghubungi kami.
          </p>
        </div>

        {/* Bagian Kanan: Daftar FAQ */}
        {/* max-w-xl: membatasi lebar daftar pertanyaan agar tidak terlalu lebar */}
        <div className="md:w-2/3 flex flex-col gap-4 max-w-xl">
          {faqs.map((item, index) => (
            <div
              key={index}
              // border dengan opacity 50%
              className="border border-[#FE8A8A]/50 rounded-md p-4 shadow-sm"
            >
              {/* Baris Pertanyaan */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-[#FE8A8A] font-semibold">{item.question}</h3>
                {/* Ikon Up/Down */}
                {openIndex === index ? (
                  <FaChevronUp className="text-[#FE8A8A]" />
                ) : (
                  <FaChevronDown className="text-[#FE8A8A]" />
                )}
              </div>

              {/* Jawaban, tampil jika openIndex === index */}
              {openIndex === index && (
                <p className="mt-2 text-[#FE8A8A]">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
