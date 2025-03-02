import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";


const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`absolute right-2 top-2 p-3 bg-[#FE8A8A] text-white w-10 h-10 flex items-center justify-center rounded-tr-[12px] rounded-bl-[12px] cursor-pointer transition-all duration-300`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72 rounded-sm" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}><h2 className="card-title text-[#FE8A8A]">{item.name}</h2></Link>
        <p className="text-[#FE8A8A]">{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold text-[#FE8A8A]">
            <span className="text-sm text-[#FE8A8A]">Rp </span> {item.price}
          </h5>
          <button className="btn bg-[#FE8A8A] text-white border-none"><FaShoppingCart /> </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;