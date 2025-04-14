const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Transaction = sequelize.define('Transaction', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'order_id' // ⬅️ ini penting!
    },
    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status'
    },
    paymentType: {
      type: DataTypes.STRING,
      field: 'payment_type'
    },
    grossAmount: {
      type: DataTypes.STRING,
      field: 'gross_amount'
    },
    transactionTime: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    customerEmail: {
      type: DataTypes.STRING,
      field: 'customer_email' // kalau mau simpan ini, tambahkan kolom di DB dulu!
    }
  });
  

module.exports = Transaction;
