import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    if (!data.image || data.image.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Harap pilih gambar sebelum mengunggah!",
      });
      return;
    }

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const imageData = await response.json();

      if (imageData.secure_url) {
        const blogData = {
          title: data.title,
          desc: data.desc,
          img: imageData.secure_url,
          date: data.date,
          time_read: data.time_read
        };

        const result = await axiosSecure.post('/blog', blogData);

        if (result) {
          reset();
          setPreviewImage(null);
          Swal.fire({
            icon: "success",
            title: "Blog berhasil ditambahkan!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } catch (error) {
      console.error("Upload gagal:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengunggah gambar atau menyimpan blog!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full md:w-[870px] px-4 mx-auto pl-10'>
      <h2 className='text-2xl font-semibold my-4 mt-10'>
        Tambahkan <span className='text-[#FE8A8A]'>Blog Baru!</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mt-4">
          <label className="label"><span className="label-text">Judul Blog*</span></label>
          <input {...register("title", { required: true })} type="text" placeholder="Judul blog" className="input input-bordered w-full" />
        </div>

        <div className="form-control w-full mt-4">
          <label className="label"><span className="label-text">Deskripsi Blog*</span></label>
          <textarea {...register("desc", { required: true })} className="textarea textarea-bordered h-24" placeholder="Isi blog..."></textarea>
        </div>

        <div className="flex gap-4">
          <div className="form-control w-full mt-4">
            <label className="label"><span className="label-text">Tanggal*</span></label>
            <input {...register("date", { required: true })} type="date" className="input input-bordered w-full" />
          </div>

          <div className="form-control w-full mt-4">
            <label className="label"><span className="label-text">Waktu Baca*</span></label>
            <input {...register("time_read", { required: true })} type="text" placeholder="Contoh: 5 Menit" className="input input-bordered w-full" />
          </div>
        </div>

        {previewImage && (
          <div className="w-full h-[250px] my-4 rounded-lg overflow-hidden">
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="form-control w-full mt-4">
          <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className={`btn bg-[#FE8A8A] text-white px-6 mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Menambahkan..." : "Tambah Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
