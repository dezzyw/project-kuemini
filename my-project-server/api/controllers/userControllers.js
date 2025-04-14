const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Menggunakan findAll() untuk Sequelize
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { name, email, photoURL, role } = req.body;

    try {
        // Cek apakah user dengan email yang sama sudah ada
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(302).json({ message: "User already exists!" });
        }

        // Membuat user baru
        const newUser = await User.create({ name, email, photoURL, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.destroy({
            where: { id: userId }
        });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const makeAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); // Cari user berdasarkan ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = "admin"; // Ubah role user menjadi admin
        await user.save(); // Simpan perubahan

        res.status(200).json({ message: `${user.name} is now an admin!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdmin = async (req, res) => {
    console.log("Headers yang diterima:", req.headers); // Debug headers

    const email = req.params.email;
    if (!email) {
        console.warn("Email tidak tersedia di params!");
        return res.status(400).json({ message: "Email is required" });
    }

    console.log(`Mencari user dengan email: ${email}`);
    const user = await User.findOne({ where: { email } });

    if (!user) {
        console.warn("User tidak ditemukan!");
        return res.status(404).json({ message: "User not found" });
    }

    console.log(`User ditemukan. Role: ${user.role}`);
    return res.status(200).json({ isAdmin: user.role === "admin" });
};



module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    makeAdmin,
    getAdmin
};
