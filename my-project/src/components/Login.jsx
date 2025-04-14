import React, { useContext, useState } from 'react';
import { FaGoogle, FaFacebookF, FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signUpWithGmail, login} = useAuth();
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");

  //redirecting to home page or specofog page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";




  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    //console.log(email, password)
    login(email, password).then((result) => {
      const user = result.user;
      alert("Login Sukses");
      console.log("userName dari localStorage:", localStorage.setItem("userName", result.user.displayName || "Pengguna"));
      localStorage.setItem("userPhoto", result.user.photoURL || "");
      ;
      navigate(from, { replace: true });
    } ).catch((error) => {
      const errorMessage = error.message;
      setErrorMessage("Provider a correct email and password!")
    })
  };


  // google sign in
  const handleLogin = () => {
    signUpWithGmail()
  .then((result) => {
    localStorage.setItem("userName", result.user.displayName || "Pengguna");
    localStorage.setItem("userPhoto", result.user.photoURL || "");

    const userInfor = {
      name: result?.user?.displayName,
      email: result?.user?.email,
    };

    axiosPublic.post('/users', userInfor)
      .then(() => alert("Membuat Akun Sukses"))
      .catch((error) => console.error("Gagal menyimpan pengguna ke database:", error));

    navigate(from, { replace: true });
  })

    .catch((error) => console.error("Error saat login Google:", error));
  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full p-5">
        {/* Formulir */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-pink-500 mb-2 text-center">Selamat Datang!</h3>
          <p className="text-gray-600 mb-10 text-center">Masuk dan nikmati manisnya belanja kue favoritmu. 🍰</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm">E-mail</label>
              <input 
                type="email" 
                placeholder="Masukkan E-mail" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm mb-2"
                {...register("email", { required: "Email wajib diisi" })} 
              />
              {errors.email && <p className="text-[#FF0000] text-xs">{errors.email.message}</p>}
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm">Kata Sandi</label>
              <input 
                type="password" 
                placeholder="Masukkan Kata Sandi" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm mb-2"
                {...register("password", { required: "Kata sandi wajib diisi" })} 
              />
              {errors.password && <p className="text-[#FF0000] text-xs">{errors.password.message}</p>}
              <a href="#" className="text-sm text-gray-400 hover:underline mt-1 mb-5 inline-block">Lupa Password?</a>
            </div>

            {/*error */}
            {
              errorMessage ? <p className='text-[#FF0000] text-xs italic'>{errorMessage}</p> : ""
            }
            
            {/* Tombol Masuk */}
            <button type="submit" className="w-full p-3 bg-[#FE8A8A] text-white rounded-lg hover:bg-pink-500">Masuk</button>
          </form>
          
          <p className="text-center mt-4 text-gray-600 text-sm mb-10">
            Belum punya akun? 
            <Link to="/signup" className="text-pink-500 underline ml-1">Daftar</Link>
          </p>
          
          {/* Social Login */}
          <div className="text-center space-x-3 mt-4">
            <button className="btn btn-circle hover:bg-[#FE8A8A] hover:text-white" onClick={handleLogin}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-[#FE8A8A] hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-[#FE8A8A] hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
        
        {/* Gambar */}
        <div className="w-1/2 p-1">
          <img 
            src="/img/login.png" 
            alt="Dessert" 
            className="object-cover w-full h-full rounded-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
