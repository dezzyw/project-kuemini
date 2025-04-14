import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddMenu = () => {
    const { register, handleSubmit, reset, watch } = useForm();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Menangani perubahan gambar untuk pratinjau sebelum upload
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

            if (!response.ok) {
                throw new Error("Gagal mengunggah ke Cloudinary");
            }

            const imageData = await response.json();

            if (imageData.secure_url) {
                const now = new Date();

                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: imageData.secure_url,
                    created_at: now,
                    updated_at: now
                };

                const postMenuItem = await axiosSecure.post('/menu', menuItem);
                if (postMenuItem) {
                    reset();
                    setPreviewImage(null);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Produk berhasil ditambahkan",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error("Gagal mengunggah gambar:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal mengunggah gambar!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto pl-10'>
            <h2 className='text-2xl font-semibold my-4 mt-10'>
                Tambahkan Produk <span className='text-[#FE8A8A]'>Kue Baru!</span>
            </h2>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mt-10">
                        <label className="label">
                            <span className="label-text">Nama Kue*</span>
                        </label>
                        <input 
                            type="text"
                            {...register("name", { required: true })} 
                            placeholder="Masukan Nama Kue" 
                            className="input input-bordered w-full" 
                        />
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Kategori Kue*</span>
                            </label>
                            <select 
                                {...register("category", { required: true })}
                                className="select select-bordered" defaultValue="default"
                            >
                                <option disabled value="default">Pilih Kategori Kue</option>
                                <option value="bento">Bento Cake</option>
                                <option value="cake">Cake</option>
                                <option value="half">Half Cake</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Harga*</span>
                            </label>
                            <input 
                                type="number" 
                                {...register("price", { required: true })}
                                placeholder="Masukan Harga" 
                                className="input input-bordered w-full" 
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Keterangan</span>
                        </label>
                        <textarea 
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24" 
                            placeholder="Tambahkan Detail Keterangan Untuk Kue"
                        ></textarea>
                    </div>

                    {/* Pratinjau Gambar */}
                    {previewImage && (
                        <div className="w-full h-[300px] my-4 rounded-lg overflow-hidden">
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="form-control w-full my-6">
                        <input 
                            {...register("image", { required: true })}
                            type="file" 
                            className="file-input file-input-bordered w-full max-w-xs" 
                            onChange={handleImageChange}
                        />
                    </div>

                    <button 
                        className={`btn bg-[#FE8A8A] text-white px-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
                        disabled={loading}
                    >
                        {loading ? "Menambahkan..." : "Tambah Produk"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMenu;
