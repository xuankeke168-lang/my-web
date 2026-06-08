# AI共学 · 个人作品集

> 与 AI 一起学习、一起成长 —— 十余年企业财务老兵的 AI 数智化转型实践站。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## ✨ 项目概览

这是一个以"AI 共学"为定位的个人作品集，主体由 **AI 学院**、**课程推荐**、**工具箱**、**关于我** 四大板块构成，全部基于 Next.js 16 App Router + React 19 + TypeScript 5 + Tailwind CSS 4 构建。内容侧重企业财务数智化转型与 Power BI / 财务共享 / 业财融合等垂直领域。

---

## 🧭 站点地图

| 路由 | 名称 | 主要内容 |
|---|---|---|
| `/` | 首页 | 个人简介 + 核心板块导览 |
| `/academy` | AI 学院 | 学习专区入口 + 24 篇 Markdown 文章 |
| `/academy/[slug]` | 文章详情 | 24 篇：AI/财务/前端/ERP 等 |
| `/academy/yecai` | 业财融合知识库（完整版） | 19 个完整专题，覆盖钻井→销售全流程 |
| `/academy/yecai/[slug]` | 业财融合专题 | 钻井管理 / 采油 / 注水 / 稠油 / HSE / 储量 等 |
| **`/academy/pl300-quiz`** | **Power BI PL-300 互动题库** | **270 道考点训练题，5 大模块，原题未精简** |
| `/tools` | 工具箱 | 自研 AI 小工具下载 |
| `/courses` | 课程推荐 | 精选 AI 课程导流 |
| `/about` | 关于我 | 个人履历 + 微信二维码 |
| `/contact` | 联系我 | 联系方式 |

---

## 🎯 Power BI PL-300 互动题库（最新功能）

270 道题，按 PL-300 官方技能域整理，**原文未精简**。支持：

- ✅ **4 种训练模式**：章节训练 / 随机 60 题 / 错题本 / 收藏题
- ✅ **2 维筛选**：5 大模块 × 3 档难度
- ✅ **答题反馈**：对错高亮 + 正确答案 + 解析 + 实战练习
- ✅ **进度条 + 统计**：当前题数 / 已答 / 正确 / 正确率
- ✅ **收藏 toggle** + **错题自动入册**
- ✅ **localStorage 持久化**：刷新不丢，重置进度不丢收藏与错题
- ✅ **暗色模式**完整适配

题库数据文件：`src/data/pl300-questions.json`（约 162 KB）。

复现方式：

```bash
python scripts/parse-pl300-html.py "C:/Users/Administrator/Downloads/PowerBI_PL300_认证学习系统_互动题库.html"
```

---

## 🛠 技术栈

- **框架**：Next.js 16（App Router、Turbopack、SSG）
- **UI**：React 19 + Tailwind CSS 4（utility-first 暗色模式）
- **类型**：TypeScript 5（`strict: true`）
- **数据层**：
  - Markdown 文章：`gray-matter` + `content/blog/*.md`（24 篇）
  - 业财融合：`src/data/yecai/*.ts`（19 个数据文件，由 `scripts/parse-yecai-html.py` 从培训材料抽取）
  - PL-300 题库：`src/data/pl300-questions.json`（270 道，由 `scripts/parse-pl300-html.py` 抽取）
- **持久化**：localStorage（仅 PL-300 互动题库使用）
- **部署**：Vercel（`vercel.json`）

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev
# → http://localhost:3000

# 生产构建
npm run build

# 启动生产服务
npm run start
```

> 推荐 Node.js 20+。

---

## 📁 项目结构

```
my-portfolio/
├── content/
│   └── blog/                      # 24 篇 Markdown 文章（gray-matter 解析）
├── public/
│   ├── wechat-gzh-qr.png          # 关于页：公众号二维码
│   └── wechat-personal.png        # 关于页：个人微信二维码
├── scripts/
│   ├── parse-yecai-html.py        # 业财融合专题 HTML 抽取脚本
│   └── parse-pl300-html.py        # PL-300 互动题库 HTML 抽取脚本
├── src/
│   ├── app/
│   │   ├── layout.tsx             # 全局布局（Geist 字体 + Navbar）
│   │   ├── page.tsx               # 首页
│   │   ├── globals.css
│   │   ├── about/                 # 关于页
│   │   ├── academy/               # AI 学院
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/            # 博客文章
│   │   │   ├── yecai/             # 业财融合知识库
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── render.tsx
│   │   │   └── pl300-quiz/        # Power BI PL-300 互动题库
│   │   │       ├── page.tsx
│   │   │       └── quiz.tsx
│   │   ├── contact/               # 联系我
│   │   ├── courses/               # 课程推荐
│   │   └── tools/                 # 工具箱
│   ├── components/
│   │   └── Navbar.tsx             # 顶部导航
│   ├── data/
│   │   ├── pl300/                 # PL-300 类型 + 聚合
│   │   ├── pl300-questions.json   # 270 道题库
│   │   └── yecai/                 # 业财融合 19 专题数据
│   └── lib/
│       ├── blog.ts                # Markdown 读取
│       ├── courses.ts             # 课程数据
│       ├── finance-biz.ts         # 业财融合主题元数据
│       └── tools.ts               # 工具数据
├── package.json
├── tsconfig.json
├── next.config.ts
├── vercel.json
└── README.md
```

---

## 📝 文档

- [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md) — 项目摘要：模块清单、数据流、复现方式

---

## 📜 License

代码部分 MIT。题库与业财融合内容版权归原作者所有，仅作个人学习整理与展示。
