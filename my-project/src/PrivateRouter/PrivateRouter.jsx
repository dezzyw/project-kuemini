import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Tampilkan loading spinner saat masih loading
  if (loading) return <LoadingSpinner />;

  // Jika user sudah login, izinkan akses
  if (user) return children;

  // Jika tidak login, redirect ke halaman /masuk
  return <Navigate to="/masuk" state={{ from: location }} replace />;
};

export default PrivateRouter;
