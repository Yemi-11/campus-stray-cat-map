const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'hhu_cat.db'));
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    openid TEXT NOT NULL UNIQUE,
    nickname TEXT DEFAULT '河海喵行者',
    role TEXT DEFAULT '普通用户',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cats (
    cat_id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    gender TEXT NOT NULL,
    fur_color TEXT,
    personality TEXT,
    health_status TEXT DEFAULT '健康',
    sterilization_status INTEGER DEFAULT 0,
    status TEXT DEFAULT '在校',
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS photos (
    photo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cat_id TEXT NOT NULL,
    upload_user_id INTEGER NOT NULL,
    photo_url TEXT NOT NULL,
    geo_lng REAL,
    geo_lat REAL,
    status TEXT DEFAULT '待审核',
    upload_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cat_id) REFERENCES cats(cat_id)
  );

  CREATE TABLE IF NOT EXISTS checkins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cat_id TEXT,
    type TEXT DEFAULT '偶遇',
    content TEXT,
    lng REAL,
    lat REAL,
    location_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS feeding_spots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    lng REAL,
    lat REAL,
    description TEXT,
    status TEXT DEFAULT '启用'
  );
`);

const count = db.prepare('SELECT COUNT(*) as count FROM cats').get();
if (count.count === 0) {
  const insert = db.prepare('INSERT INTO cats (cat_id, nickname, gender, fur_color, personality, sterilization_status, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  
  const catsList = [
    ['CAT001', '大佐', '公', '狸花白胡子', '贪吃怂', 1, '在校'],
    ['CAT002', '猪猪', '公', '橘白', '高傲', 1, '在校'],
    ['CAT003', '妖精', '母', '三花', '蹭人', 1, '在校'],
    ['CAT004', '橘胖', '公', '橘色', '憨厚', 1, '在校'],
    ['CAT005', '柠檬', '公', '橘白', '可爱', 1, '在校'],
  ];
  
  for (const cat of catsList) {
    insert.run(...cat);
  }
  
  db.prepare('INSERT INTO users (openid, nickname, role) VALUES (?, ?, ?)').run('admin_001', '管理员喵', '管理员');
  db.prepare('INSERT INTO users (openid, nickname, role) VALUES (?, ?, ?)').run('user_001', '河海喵行者', '普通用户');
  
  console.log('✅ 初始数据插入完成');
}

console.log('✅ 数据库初始化完成');
module.exports = db;