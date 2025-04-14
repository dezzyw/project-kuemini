const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load variabel dari .env

// Konfigurasi koneksi database
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nama database
    process.env.DB_USER, // Username MySQL
    process.env.DB_PASSWORD, // Password MySQL
    {
        host: process.env.DB_HOST, // Host database (localhost atau IP server)
        dialect: 'mysql', // Gunakan MySQL sebagai database
        port: process.env.DB_PORT || 3306, // Port default MySQL
        logging: false // Matikan logging query (opsional)
    }
);

// Uji koneksi ke database
sequelize.authenticate()
    .then(() => console.log('✅ Connected to MySQL successfully!'))
    .catch(err => console.error('❌ Unable to connect to MySQL:', err));

module.exports = sequelize;
