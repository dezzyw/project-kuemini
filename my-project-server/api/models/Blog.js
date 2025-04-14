const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY, // karena di DB kamu tipe DATE
    allowNull: true
  },
  time_read: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'blog_posts',
  timestamps: false
});

module.exports = BlogPost;
