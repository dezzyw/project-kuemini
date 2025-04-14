import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateBlog = () => {
  const blog = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(blog.img);
  const navigate = useNavigate();

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let imageUrl = blog.img;

    if (data.img.length > 0) {
      const formData = new FormData();
      formData.append('file', data.img[0]);
      formData.append('upload_preset', uploadPreset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData }
        );
        const result = await response.json();
        imageUrl = result.secure_url;
      } catch (err) {
        Swal.fire('Gagal', 'Gagal upload gambar ke Cloudinary', 'error');
        setLoading(false);
        return;
      }
    }

    const updatedBlog = {
      title: data.title,
      description: data.description,
      img: imageUrl,
    };

    try {
      await axiosSecure.patch(`/blog/${blog.id}`, updatedBlog);
      Swal.fire('Berhasil', 'Blog berhasil diperbarui', 'success');
      reset();
      navigate('/dashboard/kelola-blog');
    } catch (error) {
      Swal.fire('Gagal', 'Terjadi kesalahan saat mengupdate', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-[#FE8A8A]">Blog</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label"><span className="label-text">Judul Blog</span></label>
          <input
            type="text"
            defaultValue={blog.title}
            {...register('title', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-4">
          <label className="label"><span className="label-text">Deskripsi</span></label>
          <textarea
            defaultValue={blog.description}
            {...register('description', { required: true })}
            className="textarea textarea-bordered h-24"
          />
        </div>

        {previewImage && (
          <div className="w-full h-[300px] my-4 rounded-lg overflow-hidden">
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="form-control w-full my-4">
          <input
            {...register('img')}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={handleImageChange}
          />
        </div>

        <button
          className={`btn bg-[#FE8A8A] text-white px-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Mengupdate...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
