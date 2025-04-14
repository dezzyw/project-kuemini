import React, { useContext } from 'react';
import { FaGoogle, FaFacebookF, FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const { createUser, signUpWithGmail, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfor = {
                    name: user?.displayName || "User Baru",
                    email: user?.email,
                };
                axiosPublic
                .post('/users', userInfor)
                    .then(() => {
                        alert("Membuat Akun Sukses");
                        navigate("/");
                    });
            })
            .catch((error) => console.log(error));
    };

    const onSubmit = (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Kata sandi dan konfirmasi tidak cocok!");
            return;
        }

        createUser(data.email, data.password)
            .then((result) => {
                return updateUserProfile(data.name);
            })
            .then(() => {
                const userInfor = {
                    name: data.name,
                    email: data.email,
                };
                return axiosPublic.post('/users', userInfor);
            })
            .then(() => {
                alert("Membuat Akun Sukses");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                alert(`Error: ${error.message}`);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="bg-white shadow-lg rounded-lg flex max-w-5xl w-full overflow-hidden">
                <div className="w-1/2 p-6 flex items-center justify-center">
                    <img src="/img/daftar.png" alt="Signup Image" className="object-cover w-full h-full rounded-l-lg" />
                </div>
                
                <div className="w-1/2 p-14 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-pink-500 mb-4">Selamat Datang!</h3>
                    <p className="text-gray-600 mb-8 text-lg">Masuk dan nikmati manisnya belanja kue favoritmu. 🍰</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Nama */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">Nama</label>
                            <input 
                                type="text" 
                                placeholder="Masukkan Nama" 
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                {...register("name", { required: "Nama wajib diisi" })} 
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">E-mail</label>
                            <input 
                                type="email" 
                                placeholder="Masukkan E-mail" 
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                {...register("email", { required: "Email wajib diisi" })} 
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        
                        {/* Kata Sandi */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">Kata Sandi</label>
                            <input 
                                type="password" 
                                placeholder="Masukkan Kata Sandi" 
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                {...register("password", { required: "Kata sandi wajib diisi" })} 
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        {/* Konfirmasi Kata Sandi */}
                        <div>
                            <label className="block text-gray-700 text-sm mb-2">Konfirmasi Kata Sandi</label>
                            <input 
                                type="password" 
                                placeholder="Konfirmasi Kata Sandi" 
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
                                {...register("confirmPassword", { required: "Konfirmasi kata sandi wajib diisi" })} 
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        
                        <button type="submit" className="w-full p-4 bg-[#FE8A8A] text-white rounded-lg hover:bg-pink-500 text-lg font-semibold">Daftar</button>
                    </form>
                    
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button onClick={handleRegister} className="p-3 border rounded-full text-gray-700 hover:bg-gray-200">
                            <FaGoogle />
                        </button>
                        <button className="p-3 border rounded-full text-gray-700 hover:bg-gray-200">
                            <FaFacebookF />
                        </button>
                        <button className="p-3 border rounded-full text-gray-700 hover:bg-gray-200">
                            <FaGithub />
                        </button>
                    </div>

                    <p className="text-center mt-6 text-gray-600 text-sm">
                        Sudah punya akun? 
                        <button className="text-pink-500 underline ml-1 text-sm" onClick={() => navigate('/masuk')}>Masuk</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;