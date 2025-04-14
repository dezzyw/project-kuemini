import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UpdateMenu = () => {
    const item = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(item.image);

    const navigate = useNavigate();

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            
            // Hapus URL setelah dipakai untuk mencegah memory leak
            return () => URL.revokeObjectURL(imageUrl);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        
        let imageUrl = item.image; // Default ke gambar lama

        if (data.image.length > 0) {
            const imageFile = data.image[0];
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", uploadPreset); 

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    { method: "POST", body: formData }
                );

                if (!response.ok) throw new Error("Gagal mengunggah ke Cloudinary");

                const imageData = await response.json();
                imageUrl = imageData.secure_url;
            } catch (error) {
                console.error("Gagal mengunggah gambar:", error);
                Swal.fire({ icon: "error", title: "Oops...", text: "Gagal mengunggah gambar!" });
                setLoading(false);
                return;
            }
        }

        const now = new Date();
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl,
            updated_at: now
        };

        try {
            await axiosSecure.patch(`/menu/${item.id}`, menuItem);
            reset();
            setPreviewImage(imageUrl);
            Swal.fire({ position: "center", icon: "success", title: "Pembaruan Produk Berhasil!", showConfirmButton: false, timer: 1500 }); navigate("/dashboard/manage-items")
        } catch (error) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Gagal memperbarui produk!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Update Produk <span className='text-[#FE8A8A]'>Kue!</span></h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Nama Kue*</span></label>
                    <input type="text" defaultValue={item.name} {...register("name", { required: true })} placeholder="Masukan Nama Kue" className="input input-bordered w-full" />
                </div>

                <div className='flex items-center gap-4'>
                    <div className="form-control w-full my-6">
                        <label className="label"><span className="label-text">Kategori Kue*</span></label>
                        <select {...register("category", { required: true })} className="select select-bordered" defaultValue={item.category}>
                            <option disabled value="default">Pilih Kategori Kue</option>
                            <option value="bento">Bento Cake</option>
                            <option value="cake">Cake</option>
                            <option value="half">Half Cake</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Harga*</span></label>
                        <input type="number" defaultValue={item.price} {...register("price", { required: true })} placeholder="Masukan Harga" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Keterangan</span></label>
                    <textarea defaultValue={item.recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Tambahkan Detail Keterangan Untuk Kue"></textarea>
                </div>

                {previewImage && (
                    <div className="w-full h-[300px] my-4 rounded-lg overflow-hidden">
                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="form-control w-full my-6">
                    <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleImageChange} />
                </div>

                <button className={`btn bg-[#FE8A8A] text-white px-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
                    {loading ? "Menambahkan..." : "Update Produk"}
                </button>
            </form>
        </div>
    );
};

export default UpdateMenu;
