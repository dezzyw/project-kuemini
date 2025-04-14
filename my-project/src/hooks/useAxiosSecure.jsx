import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:6001", // Sesuaikan dengan backend
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            config => {
                const token = localStorage.getItem('acces-token'); 
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            response => response,
            async (error) => {
                const status = error.response?.status;

                if (status === 401 || status === 403) {
                    console.warn("❌ Token tidak valid atau expired. Menghapus token...");
                    localStorage.removeItem("acces-token");
                    
                    try {
                        await logOut();
                    } catch (err) {
                        console.error("Gagal logout:", err);
                    }

                    navigate("/masuk");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
