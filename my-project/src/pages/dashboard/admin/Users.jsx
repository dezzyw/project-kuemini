import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaUsers, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const displayedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: `Jadikan ${user.name} sebagai Admin?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Jadikan Admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/users/admin/${user.id}`);
                Swal.fire("Berhasil!", `${user.name} sekarang adalah Admin.`, "success");
                refetch();
            }
        });
    };

    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: `Hapus ${user.name}?`,
            text: "Aksi ini tidak bisa dibatalkan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/users/${user.id}`);
                Swal.fire("Dihapus!", `${user.name} telah dihapus.`, "success");
                refetch();
            }
        });
    };

    return (
        <div className="w-full px-4 mx-auto flex justify-center">
            <div className="w-full md:w-[970px] pl-10">
                <div className="flex items-center justify-between mb-16 mt-10">
                    <h2 className="text-3xl font-semibold my-4 text-center">
                        Data Semua <span className="text-[#FE8A8A]">Pengguna</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Cari Pengguna..."
                            className="input input-bordered h-10 md:w-58 ml-4 px-2 py-1"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <button className="bg-[#FE8A8A] text-white p-3 rounded">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Peran</th>
                                <th>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.map((user, index) => (
                                <tr key={index}>
                                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === "admin" ? (
                                            "Admin"
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-xs bg-[#FE8A8A] text-white"
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-xs text-[#d33]"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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

export default Users;