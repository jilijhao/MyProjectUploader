const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

// 定义文件模型，包含文件名、路径、MIME类型和大小
const File = db.define('File', {
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// 同步模型到数据库
db.sync()
    .then(() => console.log('文件模型已同步...'))
    .catch(err => console.log('错误: ' + err));

module.exports = File;
