const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Menu = require('../models/Menu');


const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalOrders = await Transaction.count(); // asumsi "Transaction" = pesanan
    const totalRevenue = await Transaction.sum('total'); // kolom `total` di tabel transaksi
    const totalProducts = await Menu.count(); // Menu = produk

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      totalProducts,
    });
  } catch (error) {
    console.error('Gagal mengambil statistik dashboard:', error);
    res.status(500).json({ error: 'Gagal mengambil data statistik' });
  }
};

module.exports = { getDashboardStats };
