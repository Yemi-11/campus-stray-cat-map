const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 设置前端静态文件
app.use(express.static(path.join(__dirname, '..', 'client')));

// 引入路由
const catsRouter = require('./routes/cats');
const checkinsRouter = require('./routes/checkins');
const mapRouter = require('./routes/map');

// 挂载路由
app.use('/api/v1/cats', catsRouter);
app.use('/api/v1/checkins', checkinsRouter);
app.use('/api/v1/map', mapRouter);

// 测试接口
app.get('/api', (req, res) => {
  res.json({ message: '🐱 河海喵境 API 运行中...' });
});

// 启动
app.listen(PORT, () => {
  console.log('🚀 服务器启动成功: http://localhost:' + PORT);
});