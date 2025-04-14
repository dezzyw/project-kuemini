import React from 'react'
import banner from '../../public/img/banner.png'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/produk');
  };

  return (
    <div className='section-container bg-gradient-to-r from-[#FE8A8A] from-0% to-[#FFDCD9] to-100%'>
      <div className='py-24 flex flex-col md:flex-row items-center justify-between gap-8'>
        {/* Texts */}
        <div className='md:w-1/2 space-y-4 px-4 flex flex-col items-start'>
          <h1 className="md:text-4xl text-3xl font-extrabold md:leading-snug leading-snug text-white">
            Setiap Potongan Kue Mini, Cerita Kebahagiaan Baru
          </h1>
          <p className='text-sm text-white/90 mt-2'>
            Kami menghadirkan roti ulang tahun yang tidak hanya lezat, tetapi juga dibuat khusus untuk melengkapi hari spesial Anda.
          </p>
          <button className='btn bg-button px-8 py-3 font-semibold text-white rounded-full border-none mt-6' onClick={handleClick}>
            Order Sekarang →
          </button>
        </div>

        {/* Image */}
        <div className='md:w-1/2 flex justify-center transform transition-transform duration-300 hover:scale-105'>
          <img src={banner} alt="Banner" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  )
}

export default Banner
