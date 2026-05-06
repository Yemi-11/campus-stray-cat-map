# campus-stray-cat-map

## 项目简介

本项目旨在为高校校园内的流浪猫建立一个有温度的数字家园。通过猫咪档案管理、地图定位标记、用户打卡互动等功能，帮助志愿者和学生更好地了解和照顾校园流浪猫，推动科学救助与绝育工作。

## 技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 前端 | HTML + CSS + JavaScript | - | 原生开发，高德地图 API 2.0 |
| 后端 | Node.js + Express | 18+ | RESTful API 服务 |
| 数据库 | SQLite (better-sqlite3) | 3.x | 轻量级文件数据库，零配置 |
| 版本管理 | Git + GitHub | - | 代码托管与协作 |

---

## 快速启动指南

### 1. 环境准备

确保你的电脑已安装以下软件：
- **Node.js**（18.x 或更高版本）：https://nodejs.org
- **Git**：https://git-scm.com

> 本项目使用 SQLite 数据库，无需额外配置。

### 2. 克隆项目

```bash
git clone https://github.com/Yemi-11/campus-stray-cat-map.git
cd campus-stray-cat-map
```

### 3. 安装依赖并启动

```bash
cd server
npm install
npm run dev
```

### 4. 访问页面

| 地址 | 说明 |
|------|------|
| http://localhost:3000/index.html | 前端主页面 |
| http://localhost:3000/api/v1/cats | 猫咪列表接口 |

---

## 功能特性

### 📱 移动端适配
- 响应式布局，支持手机浏览
- 触控友好的交互设计

### 🗺️ 地图功能
- 高德地图集成，显示猫咪位置和喂猫点
- **双列面板布局**：
  - 🥣 喂猫点列表（11个投喂点）
  - 🐱 猫咪常驻点列表（11个地点，含猫咪信息）
- 点击列表项自动定位到地图位置

### 📚 猫咪图鉴
- **32只猫咪档案**，含照片、性格、故事等信息
- 左侧菜单 + 右侧详情的布局
- 猫咪标签系统和故事墙留言功能

### 📸 打卡互动
- 偶遇打卡和投喂打卡
- AI辅助识别模拟
- 管理员审核面板

---

## 文件结构

```
campus-stray-cat-map/
├── client/                    # 前端文件
│   ├── index.html            # 主页面（移动端适配）
│   ├── locations.js          # 猫咪常驻点数据
│   └── images/               # 猫咪照片文件夹
├── server/                   # 后端服务
│   ├── routes/               # API 路由
│   ├── app.js               # 应用入口
│   ├── database.js          # 数据库配置
│   └── package.json         # 依赖配置
└── README.md                # 项目说明
```

---

## API 接口

**Base URL**: http://localhost:3000/api/v1

### 猫咪档案

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /cats | 获取猫咪列表 |
| GET | /cats/:cat_id | 获取猫咪详情 |
| GET | /cats/:cat_id/checkins | 获取猫咪故事墙 |

### 打卡互动

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /checkins | 提交打卡 |
| GET | /checkins/pending | 查看待审核打卡列表 |

### 地图服务

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /map/markers | 获取地图标记点 |

---

## 数据说明

### 猫咪常驻点（11个）

| 地点 | 猫咪 |
|------|------|
| 厚学楼 | 大佐、草草、鱼饼/小泰迪、早早、奶昔 |
| 西门 | 大佐、大脸(月饼)、柠檬 |
| 思源楼 | 马户(布丁) |
| 22舍楼下 | 妖精、六花 |
| 东湖 | 猪猪、橘胖、高高、白糖 |
| 勤学楼 | 葡萄/乌龙 |
| 博学楼 | 芒果、山竹、榴莲、大刀、蜜橘、迪佐 |
| 行政楼 | 猴猴、猬猬/焦糖、饼饼、苦橘 |
| 情人坡 | 安安 |
| 13舍附近 | 摩托 |
| 广场 | 啵啵 |

### 喂猫点（11个）

农工院、行政楼南门、叠翠山、商学院图书馆花园、垃圾中转站、东湖东北角、东湖船锚、博学楼东侧、19舍巷子、22舍楼下、猫粮取用点

---

## 数据库设计

数据库包含 5 张表：

| 表名 | 说明 | 关键字段 |
|------|------|------|
| users | 用户信息 | id, openid, nickname, role |
| cats | 猫咪档案 | cat_id (主键), nickname, gender, status |
| photos | 猫咪照片 | photo_id (主键), cat_id (外键), status |
| checkins | 打卡记录 | id (主键), user_id (外键), cat_id (外键) |
| feeding_spots | 投喂点 | id (主键), name, lng, lat |

建表脚本：`server/database.js`

---

## 使用说明

### 添加猫咪照片

1. 在 `client/images/` 文件夹中放入猫咪照片
2. 命名格式：`猫咪名字.jpg`（如 `大佐.jpg`）
3. 更新 `client/index.html` 中对应猫咪的 `image` 字段

### 自定义地图图标

1. 将图标文件放入 `client/images/` 文件夹
2. 修改 `client/index.html` 中的图标路径：
   ```javascript
   image: "images/your-icon.png"
   ```

---

## 开发说明

### 前端开发

```bash
# 直接编辑 client/index.html
# 修改后刷新浏览器即可看到效果
```

### 后端开发

```bash
cd server
npm run dev  # 开发模式，自动重启
npm start    # 生产模式
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

---

## 许可证

MIT License