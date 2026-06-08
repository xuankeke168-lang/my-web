# 个人网站项目摘要

**项目位置**: `E:\work\my-portfolio`
**创建日期**: 2024-01-16
**最近更新**: 2026-06-08（新增 Power BI PL-300 互动题库 + 项目卫生清理）
**技术栈**: Next.js 16（App Router / Turbopack）+ React 19 + TypeScript 5 + Tailwind CSS 4

---

## ✅ 已完成的工作

### 1. 项目初始化
- `create-next-app` 创建项目
- TypeScript（`strict`） + Tailwind CSS 4 + ESLint 配置完成
- Git 仓库初始化与首次提交

### 2. 路由与页面结构

| 路由 | 文件位置 | 说明 |
|---|---|---|
| `/` | `src/app/page.tsx` | 首页：核心板块导览 |
| `/academy` | `src/app/academy/page.tsx` | AI 学院：学习专区入口 + 24 篇文章 |
| `/academy/[slug]` | `src/app/academy/[slug]/page.tsx` | 24 篇文章详情（SSG 预渲染） |
| `/academy/yecai` | `src/app/academy/yecai/page.tsx` | 业财融合知识库（完整版）入口 |
| `/academy/yecai/[slug]` | `src/app/academy/yecai/[slug]/page.tsx` | 19 个业财融合专题详情 |
| **`/academy/pl300-quiz`** | `src/app/academy/pl300-quiz/page.tsx` | **Power BI PL-300 互动题库（最新）** |
| `/tools` | `src/app/tools/page.tsx` | 工具箱：自研 AI 工具下载 |
| `/courses` | `src/app/courses/page.tsx` | 课程推荐 |
| `/about` | `src/app/about/page.tsx` | 关于页（含微信二维码） |
| `/contact` | `src/app/contact/page.tsx` | 联系我 |

### 3. 核心组件
- **Navbar**（`src/components/Navbar.tsx`）：顶部固定导航（毛玻璃 + 暗色模式）
- **PL-300 Quiz**（`src/app/academy/pl300-quiz/quiz.tsx`）：客户端互动组件（4 模式 + 2 维筛选 + localStorage 持久化）
- **YecaiRenderer**（`src/app/academy/yecai/[slug]/render.tsx`）：结构化内容块渲染器

### 4. 数据层

| 数据源 | 文件 | 说明 |
|---|---|---|
| 博客文章 | `content/blog/*.md`（24 篇） | `gray-matter` 解析 frontmatter |
| 业财融合专题 | `src/data/yecai/*.ts`（19 文件） | 由 `scripts/parse-yecai-html.py` 从培训材料抽取 |
| 业财融合元数据 | `src/lib/finance-biz.ts` | 模块/专题索引、标签 |
| 课程数据 | `src/lib/courses.ts` | 精选课程 |
| 工具数据 | `src/lib/tools.ts` | 自研工具下载信息 |
| **PL-300 题库** | **`src/data/pl300-questions.json`（270 道）** | **由 `scripts/parse-pl300-html.py` 抽取** |
| **PL-300 类型 + 聚合** | **`src/data/pl300/{types,questions}.ts`** | **强类型 + 模块/难度统计** |

### 5. 部署
- `vercel.json`：Vercel 平台配置
- 代码已多次提交到 Git

---

## 🎯 Power BI PL-300 互动题库（重点模块）

| 项 | 值 |
|---|---|
| 题数 | **270 道**（原 HTML 全部保留，未做精简） |
| 模块 | 数据准备 60 / 数据建模与 DAX 70 / 可视化与报表 55 / 部署与安全 55 / 综合实战模拟 30 |
| 难度 | 初级 / 中级 / 三档可筛 |
| 训练模式 | 章节训练 / 随机 60 题 / 错题本 / 收藏题 |
| 持久化 | `localStorage` key `pl300-quiz-state-v1` |
| 暗色模式 | 完整支持 |
| 数据文件 | `src/data/pl300-questions.json`（约 162 KB） |
| 复现脚本 | `scripts/parse-pl300-html.py` |

---

## 🧹 项目卫生

最近一次清理（2026-06-08）：

- ✅ 删除 5 个孤儿 SVG（`public/{file,globe,next,vercel,window}.svg`，create-next-app 默认产物，src 内零引用）
- ✅ 删除空目录 `content/data/`
- ✅ 新增 `scripts/parse-pl300-html.py`（与 `src/data/pl300/questions.ts` 注释中的引用保持一致）
- ✅ 重写 `README.md`（原为 Next.js 默认模板）
- ✅ 更新 `PROJECT_SUMMARY.md`（本文件）

---

## 📁 项目结构（当前）

```
my-portfolio/
├── content/
│   └── blog/                      # 24 篇 Markdown 文章
├── public/
│   ├── wechat-gzh-qr.png
│   └── wechat-personal.png
├── scripts/
│   ├── parse-yecai-html.py
│   └── parse-pl300-html.py
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── academy/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/
│   │   │   ├── yecai/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── render.tsx
│   │   │   └── pl300-quiz/
│   │   │       ├── page.tsx
│   │   │       └── quiz.tsx
│   │   ├── contact/
│   │   ├── courses/
│   │   └── tools/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── data/
│   │   ├── pl300/
│   │   │   ├── types.ts
│   │   │   └── questions.ts
│   │   ├── pl300-questions.json
│   │   └── yecai/                 # 19 个业财融合专题 + types + index
│   └── lib/
│       ├── blog.ts
│       ├── courses.ts
│       ├── finance-biz.ts
│       └── tools.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── vercel.json
├── README.md
└── PROJECT_SUMMARY.md
```

---

## 🚀 常用命令

```bash
# 开发
cd e:/work/my-portfolio
npm run dev          # → http://localhost:3000

# 构建 + 启动
npm run build
npm run start

# PL-300 题库数据复现
python scripts/parse-pl300-html.py "C:/path/to/PowerBI_PL300_认证学习系统_互动题库.html"

# 业财融合数据复现
python scripts/parse-yecai-html.py
```

---

## 🔄 内容更新方式

### 新增博客文章
在 `content/blog/` 下新建 `.md`：

```markdown
---
title: '文章标题'
date: '2024-12-01'
category: '技术教程'
tags: ['Power BI', 'DAX']
---

正文...
```

### 新增 PL-300 题库
1. 从源 HTML 重新抽取：`python scripts/parse-pl300-html.py <源文件>`
2. 提交 `src/data/pl300-questions.json`

### 新增业财融合专题
1. 源 HTML 放入对应路径
2. 跑 `scripts/parse-yecai-html.py`
3. 在 `src/lib/finance-biz.ts` 注册新专题
4. 在 `src/data/yecai/index.ts` 挂载

---

## 📝 后续待办（可选）

### 高优先级
- 部署到 Vercel（手动从 GitHub 导入）

### 中优先级
- 联系表单接入 Formspree / Resend
- Navbar 主题切换按钮
- 各页面 SEO metadata 精细化

### 低优先级
- 评论系统（Giscus）
- 数据分析（Umami）
- PL-300 模拟考试限时模式

---

## 💡 关键知识点

### 1. 静态导出与 SSG
所有文章页与业财专题页都通过 `generateStaticParams` 在 build 时预渲染，访问速度与 CDN 静态资源一致。

### 2. 数据层与视图分离
业财融合 19 个专题的"内容块"（`ContentBlock[]`）和"渲染器"（`BlockRenderer`）解耦，新增类型只需扩展 `types.ts` 的 union 即可。

### 3. 客户端持久化
PL-300 题库是站点唯一使用 `localStorage` 的功能，组件首次挂载（`hydrated` 标志）后再读 localStorage，避免 SSR/CSR 不一致。

### 4. 抽取脚本的作用
`scripts/parse-*.py` 是"源 HTML → 仓库数据"的单向 ETL。每次源材料更新时重跑脚本、提交 JSON，保证内容与外部参考可同步。

---

## 🔗 相关资源

- Next.js 16 文档：https://nextjs.org/docs
- Tailwind CSS 4：https://tailwindcss.com/docs
- Vercel 部署：https://vercel.com/docs
- gray-matter：https://github.com/jonschlinkert/gray-matter

---

## ⚠️ 注意事项

1. **Node.js 版本**: 建议 Node.js 20+
2. **文件路径**: Windows 系统使用正斜杠 `/` 或双反斜杠 `\\`
3. **localStorage**: 跨设备/浏览器不共享，仅本机持久化
4. **题库内容版权**: PL-300 题库与业财融合内容归原作者所有，仅作个人学习整理与展示

---

**下次继续工作时**：
```bash
cd e:/work/my-portfolio
npm run dev
# 访问 http://localhost:3000
```
