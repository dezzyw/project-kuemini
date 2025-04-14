import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaSearch, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const KelolaBlog = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosSecure.get('/blog');
      setBlogs(response.data);
      setFilteredBlogs(response.data);
    } catch (error) {
      console.error('Gagal mengambil data blog:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (blog) => {
    Swal.fire({
      title: 'Yakin ingin menghapus blog ini?',
      text: 'Blog akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blog/${blog.id}`);
          fetchBlogs();
          Swal.fire('Berhasil!', 'Blog telah dihapus.', 'success');
        } catch (error) {
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
        }
      }
    });
  };

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full px-4 mx-auto flex justify-center">
      <div className="w-full md:w-[970px] pl-10">
        <div className="flex items-center justify-between mb-16 mt-10">
          <h2 className="text-3xl font-semibold my-4 text-center">
            Kelola Semua <span className="text-[#FE8A8A]">Blog!</span>
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Cari Blog..."
              className="input input-bordered h-10 md:w-58 ml-4 px-2 py-1"
              value={searchQuery}
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
                <th>Gambar</th>
                <th>Judul & Deskripsi</th>
                <th>Edit</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              {displayedBlogs.map((blog, index) => {
                const plainDesc = (blog.description || '').replace(/<[^>]+>/g, '');
                return (
                  <tr key={blog.id}>
                    <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                    <td>
                      <div className="w-20 h-16 rounded overflow-hidden">
                        <img src={blog.img} alt={blog.title} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold text-lg">{blog.title}</p>
                      <p className="text-sm text-gray-600" title={plainDesc}>
                        {plainDesc.length > 100 ? plainDesc.slice(0, 100) + '...' : plainDesc}
                      </p>
                    </td>
                    <td>
                      <Link to={`/dashboard/update-blog/${blog.id}`}>
                        <button className="btn btn-ghost btn-xs bg-[#FE8A8A] text-white">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(blog)} className="btn btn-xs text-[#d33]">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
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

export default KelolaBlog;
