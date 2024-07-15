// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db');
const User = require('./models/userModel');
const File = require('./models/fileModel');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);

// 同步数据库
db.sync().then(() => {
    console.log('数据库连接成功...');
}).catch(err => console.log('错误: ' + err));

app.listen(PORT, () => {
    console.log(`服务器正在运行在 http://localhost:${PORT}`);
});
