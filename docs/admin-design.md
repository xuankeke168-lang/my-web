# 后台管理全套设计 · 财务老登学AI

> 2026.06.13 · 设计文档 v1
> 目标读者：老板（你自己）+ 未来的我

---

## 一、需求范围

老板要求"流量分析等你觉得有必要的功能都要有"，即**全套**：

| # | 功能 | 必要性 | 理由 |
|---|---|---|---|
| 1 | **流量分析** | ⭐⭐⭐⭐⭐ | 写 5h/周，**不知道谁在看 = 白写** |
| 2 | **访客统计** | ⭐⭐⭐⭐ | 知道"来的人从哪来、什么时段、停留多久" |
| 3 | **文章 CRUD** | ⭐⭐⭐⭐ | Git commit 太麻烦，**后台写**省事 |
| 4 | **评论审核** | ⭐⭐⭐ | 私人站，评论少，但**得有** |
| 5 | **系统设置** | ⭐⭐ | SEO/友链/关于页偶尔改 |

**全员上线后**：
- 老板每天 5 分钟看后台
- 每周写 1 篇文章
- 每月微调一次设置

---

## 二、技术选型

### 鉴权
**NextAuth.js (GitHub OAuth)**

理由：
- 仓库已经在 GitHub（`xuankeke168-lang/my-web`）
- 单人站，只有你自己登录
- 零成本（GitHub OAuth 免费）
- 不需要记密码

### 流量分析
**Vercel Web Analytics**（主） + **Plausible**（备）

| 方案 | 成本 | 数据 | 隐私 | 推荐 |
|---|---|---|---|---|
| Vercel Web Analytics | 免费 | 美国服务器 | 一般 | ⭐⭐⭐⭐ |
| Plausible | $9/月 | 欧洲 | GDPR 友好 | ⭐⭐⭐ |
| Umami | 自建 | 自有 | 最强 | ⭐⭐（运维成本高） |
| Google Analytics | 免费 | 美国 | 最差 | ❌ 烧饼味重 |

**推荐 Vercel Analytics**：零代码，部署即用，**国内 sin1 区域速度可接受**。

### 文章 CRUD
**GitHub Contents API + 表单**

- 写文章：表单 → 提交到 `/api/posts` → API 用 GitHub token 提交 commit
- 改文章：表单预填 → 同上
- 删文章：硬删除（写一个删除确认页）
- 部署：每次提交触发 Vercel 重新部署（30 秒到 1 分钟）

### 评论
**Giscus**（GitHub Discussions 驱动）

理由：
- 零后端
- 评论 = GitHub Discussion issue
- 老板在 GitHub 直接回复
- 支持暗色主题

### 访客统计
**Vercel Web Analytics** 已经包含这块，无需额外方案。

### 系统设置
**GitHub API + `site.config.ts`**

- 改 SEO meta
- 改关于页 hero 文案
- 改友链列表
- 都是改一个 `site.config.ts` 文件，提交 commit

---

## 三、目录结构（新增）

```
src/
├── app/
│   ├── (admin)/
│   │   ├── layout.tsx          # 后台布局（鉴权 + 导航）
│   │   ├── page.tsx            # 后台首页（仪表盘）
│   │   ├── posts/
│   │   │   ├── page.tsx        # 文章列表
│   │   │   ├── new/page.tsx    # 新建文章
│   │   │   └── [slug]/edit/page.tsx  # 编辑文章
│   │   ├── comments/page.tsx   # 评论审核
│   │   ├── analytics/page.tsx  # 流量分析（Vercel 嵌入）
│   │   └── settings/page.tsx   # 系统设置
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # NextAuth GitHub
│       ├── posts/route.ts      # 文章 CRUD
│       └── settings/route.ts   # 系统设置
├── lib/
│   ├── github.ts               # GitHub Contents API 封装
│   └── analytics.ts            # Vercel Analytics 封装
└── types/
    └── admin.ts                # 后台类型
```

---

## 四、核心代码骨架

### 1. NextAuth 配置

```ts
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // 只允许 owner 登录
      return profile?.login === "xuankeke168-lang"
    },
  },
})
```

### 2. GitHub Contents API 封装

```ts
// src/lib/github.ts
import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function createPost(filename: string, content: string) {
  await octokit.repos.createOrUpdateFileContents({
    owner: "xuankeke168-lang",
    repo: "my-web",
    path: `content/blog/${filename}`,
    message: `chore(blog): 新增 ${filename}`,
    content: Buffer.from(content).toString("base64"),
  })
}

export async function updatePost(filename: string, content: string, sha: string) {
  await octokit.repos.createOrUpdateFileContents({
    owner: "xuankeke168-lang",
    repo: "my-web",
    path: `content/blog/${filename}`,
    message: `chore(blog): 更新 ${filename}`,
    content: Buffer.from(content).toString("base64"),
    sha,
  })
}
```

### 3. 后台首页（仪表盘）

```tsx
// src/app/(admin)/page.tsx
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getAllPosts } from "@/lib/blog"

export default async function AdminHome() {
  const session = await auth()
  if (!session) redirect("/api/auth/signin")

  const posts = getAllPosts()
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card title="文章总数" value={posts.length} />
      <Card title="本月新增" value={posts.filter(p => p.date.startsWith("2026-06")).length} />
      <Card title="最近更新" value={posts[0]?.title || "无"} />
    </div>
  )
}
```

---

## 五、实施计划（10 天）

| 阶段 | 天数 | 内容 | 验收 |
|---|---|---|---|
| **P0: 基建** | 1 | NextAuth + 中间件保护 | 未登录访问 `/admin/*` 自动跳登录 |
| **P1: 流量分析** | 0.5 | Vercel Analytics 集成 | 部署后能看 PV/UV |
| **P2: 文章 CRUD** | 3 | 新建/编辑/删除 + 提交 commit | 后台写一篇文章，Vercel 自动部署 |
| **P3: 评论** | 1 | Giscus 集成 + 审核页 | 文章页能评论，admin 能看 |
| **P4: 访客** | 0.5 | Vercel Analytics 复用 | 后台首页有"今日访客"卡片 |
| **P5: 系统设置** | 2 | site.config.ts 编辑器 | 后台改 SEO，commit 生效 |
| **P6: 仪表盘** | 1 | 后台首页聚合卡片 | 打开 `/admin` 看到所有数据 |
| **P7: 部署测试** | 1 | 端到端 + 权限测试 | 整套流程跑通 |

**总计**：~10 天 = ~80 小时

---

## 六、关键决策

### Q1: 后台要不要放公网？

- **方案 A**：`shuzhicaiwu.me/admin`（所有人都能访问 URL，但未登录跳 GitHub OAuth）
- **方案 B**：本地 only — `localhost:3000/admin`，部署后无后台

**推荐 A**：但加 Vercel 密码保护（`<vercel-password-protection>` 1 行代码）。

### Q2: 鉴权失败怎么处理？

- 不是 owner → 显示 403 + 退出登录按钮
- 登录失败 → 显示错误 + 重试按钮
- token 过期 → 自动跳登录

### Q3: 写文章失败怎么办？

- 提交 commit 失败 → 提示 + 保留草稿
- Vercel 部署失败 → 提示 + 链接到 GitHub Actions 日志

---

## 七、必须的环境变量

```env
# .env.local（不提交）
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=https://shuzhicaiwu.me
GITHUB_ID=xxx
GITHUB_SECRET=xxx
GITHUB_TOKEN=xxx  # 用于 commit
```

**Vercel 部署时**：在 Vercel dashboard → Settings → Environment Variables 配置。

---

## 八、风险

| 风险 | 概率 | 影响 | 缓解 |
|---|---|---|---|
| GitHub API 限流 | 低 | 中 | 加缓存（1 分钟） |
| Vercel 部署失败 | 中 | 高 | 回滚按钮在 GitHub |
| 老板忘记登录 | 中 | 低 | 加 cookie 30 天 |
| 私人站被发现 | 中 | 中 | 不强求匿名，但 robots 禁搜索引擎 |

---

## 九、MVP 路线（如果时间紧）

老板时间紧的话，**P0 + P1 + P6** 即可 = **2 天**：

- ✅ NextAuth 鉴权
- ✅ Vercel Analytics 流量
- ✅ 后台首页仪表盘

其他（P2-P5）可以**慢慢加**，因为：
- 文章 CRUD：当前 Git commit 也行
- 评论：Giscus 独立加，不依赖后台
- 系统设置：直接改 `site.config.ts` 也行

---

## 十、下一步

1. 老板拍板：**P0+P1+P6 先上** 还是 **P0-P7 全套**？
2. 我开工：拿到 GitHub OAuth credentials（老板去 https://github.com/settings/developers 建一个 OAuth App）
3. 第 1 天交付：P0 + P1（鉴权 + 流量分析），后台首页看数据
