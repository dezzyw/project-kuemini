import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../public/img/Logopink.png';
import Profile from './Profile';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useAuth();
  const [cart, refetch] = useCart();
  const [cartCount, setCartCount] = useState(cart.length);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navItems = (
    <ul className="menu menu-horizontal space-x-6">
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
    </ul>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out ${isSticky ? 'bg-opacity-90 backdrop-blur-lg' : ''}`}>
      <div className="navbar px-4 lg:px-24 py-3">
        <div className="navbar-start">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-36 h-auto transition-transform duration-300 ease-in-out transform hover:scale-105" />
          </Link>
        </div>

        <div className="navbar-center">{navItems}</div>

        <div className="navbar-end space-x-3">
          <Link to="/cart-page">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FE8A8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && <span className="badge badge-sm indicator-item">{cartCount}</span>}
              </div>
            </button>
          </Link>

          {user ? <Profile use={user} /> : (
            <button 
              onClick={() => navigate('/masuk')}
              className="btn btn-outline text-[#FE8A8A] border-[#FE8A8A] hover:bg-[#FE8A8A] hover:text-white transition-colors duration-300">
              Masuk
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
