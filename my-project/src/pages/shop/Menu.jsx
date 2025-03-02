import React from 'react'
import Banner from '../shop/Banner'
import ProdukPopuler from '../shop/Popularproduk'
import Produk from './Produk'


const Menu = () => {
  return (
    <div>
      <Banner/>
      <ProdukPopuler/>
      <Produk/>
    </div>
  )
}

export default Menu