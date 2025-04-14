const Cart = require("../models/Carts");

// ✅ Ambil semua item di keranjang berdasarkan email
const getCartByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email diperlukan" });
        }

        const cartItems = await Cart.findAll({ where: { email } });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil data", error: error.message });
    }
};

// ✅ Tambah item ke keranjang (Cek apakah produk sudah ada)
const addToCart = async (req, res) => {
    try {
        const { id, name, quantity, image, price, email } = req.body;

        if (!name || !image || !price || !quantity || !email) {
            return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
        }

        const newItem = await Cart.create({ id, name, quantity, image, price, email });

        res.json({
            success: true,
            insertedId: newItem.id,
            data: newItem,
            message: "Produk berhasil ditambahkan ke keranjang",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal menambahkan item", error: error.message });
    }
};

// ✅ Update jumlah item di keranjang
const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ success: false, message: "Jumlah minimal adalah 1" });
        }

        const updated = await Cart.update({ quantity }, { where: { id: req.params.id } });

        if (updated[0] > 0) {
            res.json({ success: true, message: "Jumlah item diperbarui" });
        } else {
            res.status(404).json({ success: false, message: "Item tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal memperbarui item", error: error.message });
    }
};

// ✅ Hapus item dari keranjang berdasarkan ID
const deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy({ where: { id: req.params.id } });

        if (deleted) {
            res.json({ success: true, message: "Item dihapus dari keranjang" });
        } else {
            res.status(404).json({ success: false, message: "Item tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal menghapus item", error: error.message });
    }
};

// ✅ Ambil satu item berdasarkan ID
const getSingleCart = async (req, res) => {
    try {
        const cartItem = await Cart.findByPk(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Item tidak ditemukan" });
        }
        res.json(cartItem);
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil item", error: error.message });
    }
};

// ✅ Hapus semua item di keranjang berdasarkan email
const clearCartByEmail = async (req, res) => {
    try {
        const deleted = await Cart.destroy({ where: { email: req.params.email } });

        if (deleted) {
            res.json({ success: true, message: "Keranjang berhasil dikosongkan" });
        } else {
            res.status(404).json({ success: false, message: "Tidak ada item untuk dihapus" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengosongkan keranjang", error: error.message });
    }
};

module.exports = {
    getCartByEmail,
    addToCart,
    updateCart,
    deleteCart,
    getSingleCart,
    clearCartByEmail
};
