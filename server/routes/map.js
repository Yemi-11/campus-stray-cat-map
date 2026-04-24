const express = require('express');
const router = express.Router();
const db = require('../database');

// 获取地图标记点
router.get('/markers', (req, res) => {
  try {
    const cats = db.prepare(`
      SELECT cat_id, nickname, gender, fur_color 
      FROM cats WHERE status = '在校'
    `).all();
    
    const spots = db.prepare("SELECT * FROM feeding_spots").all();
    
    res.json({ success: true, data: { cats, spots } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;