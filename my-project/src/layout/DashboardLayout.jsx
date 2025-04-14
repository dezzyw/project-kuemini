import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaQuestionCircle, FaRegCreditCard, FaRegIdCard, FaUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart, FaLocationArrow } from "react-icons/fa";
import Masuk from "../../src/components/Login";
import { IoNewspaper } from "react-icons/io5";
import { MdOutlineAddToPhotos } from "react-icons/md";


import logo from "/logopink.png";
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
  <>
        <li className='mt-3'>
        <Link to="/"><MdDashboard />Beranda</Link>
      </li>
      <li>
        <Link to="/produk"><FaShoppingCart/>Produk</Link>
      </li>
      {/*<li>
        <Link to="/menu"><FaLocationArrow/>Orders Tracking</Link>
      </li>
            <li>
        <Link to="/menu"><FaQuestionCircle/>Customer Support</Link>
      </li>*/}
  </>
)

const DashboardLayout = () => {
  const { loading, user } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();

  console.log("🚀 Dashboard Layout - User:", user);
  console.log("🔍 isAdmin:", isAdmin);
  console.log("⏳ isAdminLoading:", isAdminLoading);

  if (loading || isAdminLoading) {
    return <p>Loading...</p>; // Tambahkan indikator loading agar tidak langsung redirect ke login
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
              <div className="flex items-center justify-between mx-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn bg-[#FEAFAF] text-white drawer-button lg:hidden"
                >
                  <MdDashboardCustomize />
                </label>
                <button className="btn bg-[#FEAFAF] flex items-center gap-2 rounded-full px-6 text-white sm:hidden">
                  <FaRegUser /> Log Out
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet />
              </div>
            </div>

            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  <Link to="/dashboard" className="flex justify-start mb-3">
                    <img src={logo} alt="" className="w-40" />
                    <span className="bg-[#FEAFAF] text-white px-3 py-1 mt-2 rounded-full">admin</span>
                  </Link>
                </li>
                <hr />
                <li className="mt-3">
                  <Link to="/dashboard">
                    <MdDashboard />Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/pemasukan">
                    <FaRegCreditCard/>Pemasukan
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-menu">
                    <FaPlusCircle />Tambah Produk
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-items">
                    <FaEdit />Kelola Produk
                  </Link>
                </li>
                <li >
                  <Link to="/dashboard/users">
                    <FaUser />Data Pengguna
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-blog">
                  <MdOutlineAddToPhotos />Tambah Blog
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/dashboard/kelola-blog">
                  <IoNewspaper />Kelola Blog
                  </Link>
                </li>
                

                <hr />

                {/* shared nav links*/}
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Masuk />
      )}
    </div>
  );
};


export default DashboardLayout