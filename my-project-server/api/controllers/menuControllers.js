const { tr } = require("framer-motion/client");
const Menu = require("../models/Menu");

// Mengambil semua menu dari MySQL
const getAllMenuItems = async (req, res) => {
    try {
        const menus = await Menu.findAll({ order: [['created_at', 'DESC']] }); // Mengambil semua data menu, disortir berdasarkan created_at DESC
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu items", error: error.message });
    }
};


//post a new item
const postMenuItem = async (req, res) => {
    const newItem = req.body;
    console.log("Received Data:", newItem);  // Log data yang diterima
    try {
        const result = await Menu.create(newItem);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error details:", error);  // Cek error lebih lanjut
        res.status(500).json({ message: "Error adding menu item", error: error.message });
    }
};

//delete menu item
const deleteMenuItem = async (req, res) => {
    const menuId = parseInt(req.params.id, 10); // Ubah menuId menjadi integer
    console.log(menuId);
    
    if (isNaN(menuId)) {
        return res.status(400).json({ message: "ID tidak valid" });
    }

    try {
        const deletedItem = await Menu.destroy({
            where: {
                id: menuId
            }
        });

        if (!deletedItem) {
            return res.status(404).json({ message: "Produk Tidak Ditemukan" });
        }

        res.status(200).json({ message: "Produk Berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting menu item", error: error.message });
    }
};


//get single menu item
const singleMenuItem = async (req, res, next) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findByPk(menuId); // Menggunakan findByPk untuk mencari berdasarkan ID

        if (!menu) {
            return res.status(404).json({ message: "Produk Tidak Ditemukan" });
        }

        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu item", error: error.message });
    }
};

//update menu item
const updatedMenuItem = async (req, res, next) => {
    const menuId = req.params.id;
    const { name, recipe, image, category, price } = req.body;

    try {
        // Cari item menu berdasarkan ID
        const menuItem = await Menu.findByPk(menuId);

        if (!menuItem) {
            return res.status(404).json({ message: "Produk Tidak Ditemukan" });
        }

        // Update item menu
        await menuItem.update({ name, recipe, image, category, price });

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating menu item", error: error.message });
    }
};






module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updatedMenuItem
};
