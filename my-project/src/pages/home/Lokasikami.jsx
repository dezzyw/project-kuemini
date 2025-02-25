import { MapPin, Phone, Instagram } from "lucide-react";

export default function LokasiKami() {
  return (
    <section className="flex flex-col items-center py-16 bg-white">
      <h2 className="text-4xl font-bold text-[#FE8A8A] mb-2 mt-10">Lokasi Kami</h2>
      <p className="text-center text-[#FE8A8A] mb-10">Temukan dimana lokasi kami!</p>

      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Bagian Kontak */}
        <div className="bg-[#FE8A8A] text-white p-8 md:w-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl text-center font-bold mt-20 mb-14">Kue Mini</h3>
            <div className="flex items-center space-x-3 mb-3">
              <MapPin size={24} />
              <span className="text-lg">Dukuhwaluh, Banyumas</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <Phone size={24} />
              <span className="text-lg">082136851625</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <Instagram size={24} />
              <span className="text-lg">@kueminipwt</span>
            </div>
          </div>
          <button className="mt-8 bg-white text-[#FE8A8A] px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-200 transition">
            Hubungi Kembali
          </button>
        </div>

        {/* Bagian Peta */}
        <div className="flex-1">
          <iframe
            className="w-full h-96 md:h-[500px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.9432272368015!2d109.25322931477792!3d-7.801828779510631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e656b5c3a37e7c3%3A0x15f5e7c0d3243c91!2sDukuhwaluh%2C%20Banyumas%2C%20Jawa%20Tengah!5e0!3m2!1sen!2sid!4v1646855023213!5m2!1sen!2sid"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
