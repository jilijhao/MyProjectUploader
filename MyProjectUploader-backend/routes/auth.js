// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();
const secret = 'your_jwt_secret';

// 用户注册
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: '用户注册成功', user: newUser });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: '密码错误' });
        }
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
        res.status(200).json({ message: '登录成功', token });
    } catch (error) {
        res.status(500).json({ message: '登录失败', error });
    }
});

module.exports = router;
