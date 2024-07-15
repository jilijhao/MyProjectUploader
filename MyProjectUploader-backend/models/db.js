const { Sequelize } = require('sequelize');

// 使用Sequelize连接到MySQL数据库
const db = new Sequelize('myprojectuploader', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = db;
