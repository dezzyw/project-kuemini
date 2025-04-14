import React, { createContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Membuat akun baru
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Signup dengan Google
    const signUpWithGmail = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Login dengan email & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout user
    const logOut = () => {
        return signOut(auth)
            .then(() => setUser(null)) // Reset state user setelah logout
            .catch(error => console.error("Logout Error:", error));
    };

    // Update profil user
    const updateUserProfile = async ({ name, photoURL }) => {
        if (!auth.currentUser) return;

        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL
            });

            // Refresh data user setelah update
            await auth.currentUser.reload(); 
            setUser({ ...auth.currentUser });

            return "Profile updated successfully!";
        } catch (error) {
            console.error("Update profile error:", error);
            throw error;
        }
    };

    // Mengecek status login user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            // Update state user saat ada perubahan autentikasi

            if(currentUser){
                const userInfo = {email: currentUser.email}
                axios.post('http://localhost:6001/jwt', userInfo)
                .then((response) => {
                    //console.log(response.data.token);
                    if(response.data.token){
                        localStorage.setItem("acces-token", response.data.token)
                    }
                })
            } else{
                localStorage.removeItem("acces-token")
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        createUser,
        signUpWithGmail,
        login,
        logOut,
        updateUserProfile,
        loading, // Menyediakan state loading agar bisa digunakan di komponen lain
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
