---
title: 'Claude Code MCP 入门指南：给AI装上插件，能力翻倍'
date: '2026-04-25'
category: 'AI编程工具'
tags: ['Claude Code', 'AI编程', 'MCP', '插件扩展']
---

# Claude Code MCP 入门指南：给AI装上插件，能力翻倍

> 学习来源：跟老金老师学的 Claude Code 系列课程

Claude Code 本身已经很能打了——能读文件、能写代码、能跑命令。但有了 **MCP**，它的能力直接再上一个台阶。

---

## 一、MCP 是个啥？用买菜来理解

MCP（Model Context Protocol）是 Anthropic 推出的**AI工具扩展协议**。说人话就是**给AI装插件**。

最好理解的方式是类比：

| 概念 | 类比 | 说明 |
|------|------|------|
| Claude Code | 你的手机 | 核心设备 |
| MCP 协议 | 应用商店标准 | 统一接口规范 |
| MCP 服务器 | 手机App | 各种扩展功能 |
| 配置文件的 MCP 配置 | 安装App | 装上就能用 |

**没装MCP的Claude Code** = 只能读写本地文件、跑跑命令
**装了MCP的Claude Code** = 能查数据库、操作GitHub、搜网页、调API……

跟直接在对话里让AI"帮我查一下"的区别在于：MCP 让AI **自己就能完成这些操作**，不需要你手动贴数据。

---

## 二、MCP 到底能干什么？真实场景说话

### 场景1：报错时自动查GitHub Issues

```bash
# 装了 GitHub MCP 后
> 这个报错我怀疑是个已知Bug，帮我查查 GitHub Issues 里有没有人遇到过
# AI 自动搜索 GitHub Issues，找到相关讨论，给出解决方案
```

### 场景2：直接连数据库查数据

```bash
# 装了数据库 MCP 后
> 帮我查一下 users 表里最近一周注册的用户数
# AI 自动连数据库、执行SQL、返回结果
```

### 场景3：搜索最新技术文档

```bash
# 装了 Web Search MCP 后
> Next.js 15 有哪些新特性？帮我查一下官方文档
# AI 自动搜索网页，获取最新信息，而不是依赖训练数据
```

### 场景4：操作外部API

```bash
# 装了对应的 MCP 后
> 帮我用 Jira API 查一下这个Sprint还有哪些未完成的任务
# AI 调用 Jira API，返回实时数据
```

---

## 三、配置文件详解

MCP 的配置文件在项目根目录的 `claude.json`（也可以放在 `~/.claude/claude.json` 全局配置）：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/mcp-server", "--option", "value"],
      "env": {
        "API_KEY": "your-key-here"
      }
    }
  }
}
```

**字段说明：**

| 字段 | 必须 | 说明 |
|------|------|------|
| `mcpServers` | ✅ | 所有MCP服务器的配置入口 |
| `server-name` | ✅ | 自定义服务器名称，用来标识 |
| `command` | ✅ | 启动命令（npx、node、python等） |
| `args` | ✅ | 命令参数数组 |
| `env` | ❌ | 环境变量配置（存放API密钥等敏感信息） |

**⚠️ 安全提示：** API密钥这类敏感信息请放在 `env` 字段或 `.env` 文件中，**不要硬编码**在args里。

---

## 四、实战配置：6个我最常用的MCP服务器

### 1. Filesystem — 增强文件操作

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

**能干什么：** 更精细的文件读写、目录遍历、文件搜索（比Claude Code自带的文件操作更灵活）

---

### 2. GitHub — 操作GitHub仓库

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_你的token"
      }
    }
  }
}
```

**能干什么：**
- 搜索 Issues 和 PR
- 查看代码、创建 PR
- 管理 Releases
- 操作 Repository

**使用场景：**
```bash
> 帮我看看这个仓库有没有关于"rate limit"的Issues
> 给这个Issue回复一下我的排查结果
```

---

### 3. PostgreSQL — 直接连数据库

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost:5432/mydb"]
    }
  }
}
```

**能干什么：**
- 执行SQL查询
- 查看表结构
- 分析数据

**使用场景：**
```bash
> 帮我查查 orders 表的结构
> 写一个SQL：统计上个月每个月的销售额趋势
> 分析一下有没有慢查询
```

⚠️ **注意：** 生产数据库不要随便连！建议只用读权限账号连测试环境或只读副本。

---

### 4. Web Search — 联网搜索

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/server-search"]
    }
  }
}
```

**能干什么：**
- 搜索最新技术文档
- 查实时数据
- 找开源项目

**使用场景：**
```bash
> 查一下 React 19 的最新稳定版发布了没有
> 搜索一下"Next.js parallel routes"的最佳实践
```

---

### 5. Memory — 知识持久化

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

**能干什么：**
- 让AI记住跨会话的信息
- 保存项目规范和约定
- 记住你的偏好配置

**使用场景：**
```bash
> 记住：这个API默认返回分页数据，每页20条
> 记住我们项目的命名规范：文件名用kebab-case，组件名用PascalCase
```

---

### 6. Puppeteer — 浏览器自动化

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

**能干什么：**
- 截图网页
- 提取页面内容
- 执行浏览器操作

**使用场景：**
```bash
> 帮我截取一下这个页面的截图：http://localhost:3000
> 抓取这个页面的主要内容，提取成Markdown
```

---

## 五、MCP 服务器速查表

| 服务器 | 用途 | 安装方式 | 推荐度 |
|--------|------|---------|-------|
| `server-filesystem` | 文件操作 | npx | ⭐⭐⭐⭐⭐ |
| `server-github` | GitHub集成 | npx | ⭐⭐⭐⭐⭐ |
| `server-postgres` | PostgreSQL | npx | ⭐⭐⭐⭐ |
| `server-sqlite` | SQLite | npx | ⭐⭐⭐ |
| `server-puppeteer` | 浏览器自动化 | npx | ⭐⭐⭐⭐ |
| `server-memory` | 知识持久化 | npx | ⭐⭐⭐⭐ |
| `server-search` | 网页搜索 | npx | ⭐⭐⭐⭐ |
| `server-filesystem-search` | 文件搜索 | npx | ⭐⭐⭐ |

---

## 六、管理MCP的命令

配置好后，在交互模式中用以下命令管理：

```bash
# 查看所有已连接的MCP服务器
> /mcp

# 重启某个MCP服务器（如果出问题了）
> /mcp restart server-name

# 检查某个MCP服务器的状态
> /mcp status server-name
```

**首次配置后的最佳实践：**
1. 先配置好 `claude.json`
2. 重启Claude Code让配置生效
3. 输入 `/mcp` 检查服务器连接状态
4. 如果显示 `connected` 就说明成功了
5. 如果显示 `error`，检查路径和参数是否正确

---

## 七、常见问题

**Q: MCP服务器启动失败怎么办？**
A: 三步排查：① 检查命令和路径是否正确 ② 检查端口是否被占用 ③ 运行 `/doctor` 检查系统状态

**Q: 多个项目都需要相同的MCP配置怎么办？**
A: 可以配置在全局 `~/.claude/claude.json` 中，所有项目自动生效。项目级的 `claude.json` 会覆盖全局配置。

**Q: MCP服务器安全吗？**
A: 每个MCP服务器只获得你授予的权限。比如GitHub MCP只操作你授权的仓库，PostgreSQL MCP只连你配置的数据库。但建议：
- 生产环境数据库不要给写权限
- API密钥用 env 字段管理，不要硬编码
- 只安装可信来源的MCP服务器

**Q: 一个项目能同时配置多个MCP服务器吗？**
A: 可以！`claude.json` 里可以配任意多个。比如我同时配了GitHub + Database + Search，一个会话里都能用。

**Q: MCP服务器需要自己维护吗？**
A: 大部分通过 npx 运行的MCP服务器会自动更新，基本不需要维护。如果遇到问题，重启Claude Code一般能解决。

---

## 八、总结

MCP 让 Claude Code 从"只能操作本地文件"变成"能连接各种外部工具"：

- **装插件** → 在 `claude.json` 中配置MCP服务器
- **用插件** → AI自动调用，你只需要提需求
- **管插件** → `/mcp` 命令查看和管理

建议先从 `filesystem` 和 `github` 两个MCP服务器入手，体验一下AI"能力扩展"的感觉，再逐步增加其他服务器。

*本文学自老金老师的Claude Code系列教程。*
