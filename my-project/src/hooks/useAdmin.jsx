import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    console.log("User di useAdmin:", user); // Debug user
    
    const { refetch, data: isAdmin, isLoading: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) {
                console.warn("Email belum tersedia!");
                return false; 
            }

            try {
                console.log(`Mengirim request ke: /users/admin/${user.email}`);
                const res = await axiosSecure.get(`/users/admin/${user.email}`);
                console.log("Response dari server:", res.data); // Debug response
                return res.data?.isAdmin || false;
            } catch (err) {
                console.error("Error fetching admin status:", err);
                if (err.response?.status === 401) {
                    console.warn("⚠️ Unauthorized! Coba cek token atau backend.");
                }
                return false;
            }
        },
        enabled: !!user?.email // Query hanya dijalankan jika email tersedia
    });

    return { isAdmin, isAdminLoading, refetch, error };
};

export default useAdmin;
