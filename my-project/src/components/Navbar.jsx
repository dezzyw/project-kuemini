import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/img/Logopink.png';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const navItems = (
    <>
      {['Beranda', 'Tentang Kami', 'Produk', 'Blog'].map((item) => {
        const path = item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(/ /g, '')}`;
        return (
          <li key={item}>
            <Link 
              to={path}
              className={`text-[#FEAFAF] relative ${activeTab === path ? 'font-bold text-[#FE8A8A]' : ''}`}
            >
              {item}
              {activeTab === path && <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2px] w-6 h-[2px] bg-[#FE8A8A]"></span>}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out ${isSticky ? 'bg-opacity-90 backdrop-blur-lg' : ''}`}>
      <div className="navbar px-4 lg:px-24 py-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE8A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-36 h-auto transition-transform duration-300 ease-in-out transform hover:scale-105" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end space-x-3">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE8A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE8A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </button>
          <Link to="/login" className="btn btn-outline text-[#FE8A8A] border-[#FE8A8A] hover:bg-[#FE8A8A] hover:text-white transition-colors duration-300">Masuk</Link>
          <Link to="/register" className="btn btn-primary bg-[#FE8A8A] border-[#FE8A8A] text-white hover:bg-[#ff7070] transition-colors duration-300">Daftar</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
