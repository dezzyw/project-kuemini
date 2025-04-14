const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    photoURL: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
}, {
    tableName: 'users', // Nama tabel dalam database
    timestamps: false // Menyediakan createdAt & updatedAt
});

// Sinkronisasi model dengan database
sequelize.sync()
    .then(() => console.log("Users table created successfully!"))
    .catch(err => console.log("Error creating table:", err));

module.exports = User;
