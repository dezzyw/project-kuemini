const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db'); // Sesuaikan dengan lokasi konfigurasi database

const Menu = sequelize.define('Menu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recipe: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 0), // ✅ Sesuai dengan database MySQL
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW // Menambahkan default value untuk created_at
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW // Menambahkan default value untuk updated_at
    }
}, {
    tableName: 'menu', // Pastikan ini sesuai dengan database
    timestamps: false, // Nonaktifkan timestamps otomatis
});

module.exports = Menu;
