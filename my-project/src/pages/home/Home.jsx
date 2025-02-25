import React from 'react'
import Banner from '../../components/Banner'
import About from './About'
import Workshop from'./Workshop'
import PopulerProduct from './PopulerProduct'
import Testimonials from './Testimonials'
import LokasiKami from './Lokasikami'

const Home = () => {
  return (
    <div>
      <Banner/>
      <About/>
      <Workshop/>
      <PopulerProduct/>
      <Testimonials/>
      <LokasiKami/>
    </div>
  )
}

export default Home