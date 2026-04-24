const express = require('express');
const router = express.Router();
const db = require('../database');

// 获取猫咪列表
router.get('/', (req, res) => {
  try {
    const cats = db.prepare('SELECT * FROM cats').all();
    res.json({ success: true, data: cats, total: cats.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取单只猫
router.get('/:cat_id', (req, res) => {
  try {
    const cat = db.prepare('SELECT * FROM cats WHERE cat_id = ?').get(req.params.cat_id);
    if (!cat) {
      return res.status(404).json({ success: false, message: '猫咪不存在' });
    }
    res.json({ success: true, data: cat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取猫咪打卡记录
router.get('/:cat_id/checkins', (req, res) => {
  try {
    const checkins = db.prepare(`
      SELECT checkins.*, users.nickname as user_name 
      FROM checkins 
      LEFT JOIN users ON checkins.user_id = users.id 
      WHERE checkins.cat_id = ? 
      ORDER BY checkins.created_at DESC 
      LIMIT 20
    `).all(req.params.cat_id);
    res.json({ success: true, data: checkins });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;