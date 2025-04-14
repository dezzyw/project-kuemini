import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { updateUserProfile, user } = useContext(AuthContext); // pastikan user tersedia di context
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Set photoPreview dari user.photoURL jika belum di-set
  useEffect(() => {
    if (user?.photoURL) {
      setPhotoPreview(user.photoURL);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const uploadedPhotoURL = photoFile ? await simulateUpload(photoFile) : user?.photoURL || "";

      await updateUserProfile({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        country: data.country,
        photoURL: uploadedPhotoURL,
      });

      alert("Profil berhasil diperbarui!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      alert("Terjadi kesalahan saat memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  // Simulasi upload file
  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeURL = URL.createObjectURL(file);
        resolve(fakeURL);
      }, 1000);
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 mt-20">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>

        {/* Avatar Upload */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="relative w-28 h-28">
            <img
              src={
                photoPreview ||
                user?.photoURL ||
                "https://ui-avatars.com/api/?name=User&background=6C63FF&color=fff"
              }
              alt="Avatar"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-[#FE8A8A] p-2 rounded-full cursor-pointer"
            >
              <svg
                className="text-white w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12.2c-2.87 0-5.2-2.33-5.2-5.2S9.13 6.8 12 6.8s5.2 2.33 5.2 5.2-2.33 5.2-5.2 5.2zm2.65-5.94l-2.47 2.47c-.2.2-.51.2-.71 0l-1.17-1.17a.5.5 0 01.71-.71l.81.81 2.11-2.11a.5.5 0 01.71.71z" />
              </svg>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2">
  
            <button
              type="button"
              onClick={() => {
                setPhotoFile(null);
                setPhotoPreview(user?.photoURL || null);
              }}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4"
            >
              Hapus Foto
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                defaultValue={user?.name}
                {...register("name", { required: "Nama wajib diisi" })}
                className="w-full input input-bordered"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("email", { required: "Email wajib diisi" })}
                className="w-full input input-bordered"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">No. HP</label>
              <input
                type="tel"
                defaultValue={user?.phone}
                {...register("phone", { required: "Nomor HP wajib diisi" })}
                className="w-full input input-bordered"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Negara</label>
              <input
                type="text"
                defaultValue={user?.country}
                {...register("country", { required: "Negara wajib diisi" })}
                className="w-full input input-bordered"
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Alamat</label>
            <input
              type="text"
              defaultValue={user?.address}
              {...register("address", { required: "Alamat wajib diisi" })}
              className="w-full input input-bordered"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <button
            type="submit"
            className="btn bg-[#FE8A8A] hover:bg-[#5850ec] text-white w-full mt-4"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
