import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('acces-token')

  const { refetch, data: cart = [] } = useQuery({
      queryKey: ['carts', user?.email], 
      queryFn: async () => {
          if (!user?.email) return []; // Jika user belum login atau email tidak tersedia, return array kosong
          const res = await fetch(`http://localhost:6001/carts?email=${user.email}`, {
            header: {
              authorization: `Bearer ${token}`
            }
          });
          return res.json();
      },
      enabled: !!user?.email, // Query hanya berjalan jika email tersedia
  });

  return [cart, refetch];
};

export default useCart;
