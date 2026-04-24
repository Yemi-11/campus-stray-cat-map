# campus-stray-cat-map
##  项目简介

本项目旨在为高校校园内的流浪猫建立一个有温度的数字家园。通过猫咪档案管理、地图定位标记、用户打卡互动等功能，帮助志愿者和学生更好地了解和照顾校园流浪猫，推动科学救助与绝育工作。
##  技术栈

| 层级 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 前端 | HTML + CSS + JavaScript | - | 原生开发，高德地图 API 2.0 |
| 后端 | Node.js + Express | 18+ | RESTful API 服务 |
| 数据库 | SQLite (better-sqlite3) | 3.x | 轻量级文件数据库，零配置 |
| 版本管理 | Git + GitHub | - | 代码托管与协作 |

---

##  快速启动指南

1. 环境准备

确保你的电脑已安装以下软件：
- **Node.js**（18.x 或更高版本）：https://nodejs.org
- **Git**：https://git-scm.com

> 本项目使用 SQLite 数据库。
 2. 克隆项目

```bash
git clone https://github.com/Yemi-11/campus-stray-cat-map.git
cd campus-stray-cat-map

3. 安装依赖并启动
bash
cd server
npm install
npm run dev

4. 访问页面
地址	说明
http://localhost:3000/index.html	前端主页面
http://localhost:3000/api/v1/cats	猫咪列表接口

API 接口
Base URL: http://localhost:3000/api/v1

猫咪档案
方法	路径	             说明
GET	   /cats	            获取猫咪列表
GET	   /cats/:cat_id	    获取猫咪详情
GET	/cats/:cat_id/checkins	获取猫咪故事墙
打卡互动
方法	   路径	            说明
POST	/checkins	      提交打卡
GET	/checkins/pending	查看打卡列表
地图服务
方法	  路径	        说明
GET	/map/markers	获取地图标记点

🗄️ 数据库设计
数据库包含 5 张表：

表名	       说明	            关键字段
users	    用户信息	    id, openid, nickname, role
cats	    猫咪档案	    cat_id (主键), nickname, gender, status
photos	    猫咪照片	    photo_id (主键), cat_id (外键), status
checkins	 打卡记录	id (主键), user_id (外键), cat_id (外键)
feeding_spots	投喂点	id (主键), name, lng, lat
建表脚本：server/database.js