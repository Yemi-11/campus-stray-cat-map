const express = require('express');
const router = express.Router();
const db = require('../database');

// 提交打卡
router.post('/', (req, res) => {
  try {
    const { user_id, cat_id, type, content, lng, lat, location_name } = req.body;
    const result = db.prepare(`
      INSERT INTO checkins (user_id, cat_id, type, content, lng, lat, location_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(user_id || 2, cat_id, type, content, lng, lat, location_name);
    
    res.status(201).json({ success: true, message: '打卡已提交' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取打卡列表
router.get('/pending', (req, res) => {
  try {
    const checkins = db.prepare(`
      SELECT checkins.*, users.nickname as user_name 
      FROM checkins 
      LEFT JOIN users ON checkins.user_id = users.id 
      ORDER BY checkins.created_at DESC
    `).all();
    res.json({ success: true, data: checkins });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;