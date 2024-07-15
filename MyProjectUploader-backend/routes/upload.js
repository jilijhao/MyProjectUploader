// routes/upload.js
const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const File = require('../models/fileModel');

const router = express.Router();
const secret = 'your_jwt_secret';

// 认证中间件
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: '认证失败，没有提供token' });
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'token无效' });
        }
        req.user = user;
        next();
    });
};

// 文件上传配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// 上传文件
router.post('/', authenticateJWT, upload.single('file'), async (req, res) => {
    try {
        const { filename, path, mimetype, size } = req.file;
        const newFile = await File.create({ filename, path, mimetype, size });
        res.status(201).json({ message: '文件上传成功', file: newFile });
    } catch (error) {
        res.status(500).json({ message: '文件上传失败', error });
    }
});

module.exports = router;
