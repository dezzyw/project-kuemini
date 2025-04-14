import React, { useState, useEffect } from 'react';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';
import { FaEdit, FaSearch, FaTrash, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Menampilkan 10 produk per halaman
    const [searchQuery, setSearchQuery] = useState(''); // Search query state

    // Filter menu based on search query
    const filteredMenu = menu.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Hitung total halaman setelah filter
    const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

    // Filter item berdasarkan halaman dan search query
    const displayedItems = filteredMenu.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Fungsi untuk berpindah halaman
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Anda Yakin Menghapus Produk?",
            text: "Produk akan dihapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item.id}`);
                if (res) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Dihapus!",
                        text: "Produk Berhasil Dihapus."
                    });
                }
            }
        });
    };

    // Handle search input change
    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    return (
        <div className="w-full px-4 mx-auto flex justify-center">
            <div className="w-full md:w-[970px] pl-10">
                <div className="flex items-center justify-between mb-16 mt-10">
                    <h2 className="text-3xl font-semibold my-4 text-center">
                        Kelola Semua <span className="text-[#FE8A8A]">Produk Kue!</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Cari Produk..."
                            className="input input-bordered h-10 md:w-58 ml-4 px-2 py-1"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button className="bg-[#FE8A8A] text-white p-3 rounded">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Menu items table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Nama Produk</th>
                                <th>Harga</th>
                                <th>Edit</th>
                                <th>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedItems.map((item, index) => (
                                <tr key={index}>
                                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update-menu/${item.id}`}>
                                            <button className="btn btn-ghost btn-xs bg-[#FE8A8A] text-white">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-xs text-[#d33]">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center items-center gap-4 mt-10 mb-14">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm bg-[#FE8A8A] text-white"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm bg-[#FE8A8A] text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;
