---
title: 'Claude Code 完整安装指南：从零到上手，看这一篇就够了'
date: '2026-04-25'
category: 'AI编程工具'
tags: ['Claude Code', 'AI编程', '安装教程', '新手入门', '环境配置']
---

# Claude Code 完整安装指南：从零到上手，看这一篇就够了

> 学习来源：跟老金老师学的 Claude Code 系列课程

你有没有想过，有个24小时在线的编程助手，你动动嘴它就帮你写代码、改bug、搜资料？

**Claude Code** 就是这样的工具——Anthropic公司出品的AI命令行编程助手。2026年有个重大更新：官方切到了**原生安装**，不再需要Node.js了，安装从40分钟缩短到5分钟！

下面把我装机的完整过程分享出来，一步步来。

---

## 为什么选 Claude Code？

先说说它和其他AI编程工具的区别：

| 特点 | Claude Code | 其他在线AI工具 |
|------|------------|--------------|
| **代码隐私** | 代码只在你本地，AI只读你授权的文件 | 通常要上传到云端 |
| **环境依赖** | 原生安装，不需要Node.js | 通常要装一堆环境 |
| **文件操作** | 直接读写你的代码文件 | 通常只能聊天 |
| **终端权限** | 可以运行命令、执行脚本 | 一般没有 |
| **免费额度** | 新用户有赠送额度 | 各有不同 |

简单说，Claude Code不是在聊天框里跟你对话的AI，它是真的能**帮你操作项目**的AI助手。

---

## 安装前准备

### 系统要求

开搞前先确认电脑满足基本条件：

| 检查项 | 最低要求 | 怎么查 |
|--------|---------|-------|
| 操作系统 | Windows 10+ / macOS 10.15+ / Linux | 右键"此电脑"→属性 |
| 内存 | 4GB（推荐8GB） | 任务管理器看性能 |
| 网络 | 能访问外网 | 打开百度/bing试试 |

### 第二步：获取 API Key（通行证）

Claude Code需要API Key才能调用AI服务。

**注册并获取Key：**

1. 打开 [Anthropic Console](https://console.anthropic.com/)
2. 支持Google/邮箱/GitHub三种方式注册
3. 登录后点击 `Settings → API Keys`
4. 点击 `Create Key`，取个名字（比如"my-claude-key"）
5. **复制并立即保存！** Key只显示一次

⚠️ **千万不要把Key分享给别人，也别提交到GitHub！**

**关于中转站（国内用户必看）：**

国内访问Anthropic API可能会比较慢，可以考虑用**API中转站**：
- 价格通常是官方的 1/3 ~ 1/2
- 不需要科学上网
- 支持支付宝/微信支付

配置中转站需要同时设置 `ANTHROPIC_API_KEY` 和 `ANTHROPIC_BASE_URL`。

---

## 安装方式一：原生安装（推荐，最简单）

官方现在主推原生安装，**不需要安装Node.js**，一行命令搞定。

### Windows PowerShell 安装

```powershell
# 以管理员身份打开PowerShell，执行：
irm https://claude.ai/install.ps1 | iex
```

### macOS / Linux 安装

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

装完后，还需要配一下PATH环境变量（Windows用户尤其注意）：

**Windows：**
```powershell
# 把 Claude Code 安装目录加到 PATH
[System.Environment]::SetEnvironmentVariable(
    'Path',
    [System.Environment]::GetEnvironmentVariable('Path', 'User') + ';' + "$env:USERPROFILE\.local\bin",
    'User'
)
# 修改后记得重启终端！
```

**macOS / Linux：**
```bash
# 如果 claude 命令找不到，手动加一下
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 验证安装

```bash
claude --version
```

看到类似 `Claude Code v2.1.x (native)` 的输出，就说明装好了！

---

## 安装方式二：NPM安装（备选方案）

如果原生安装遇到了网络问题，也可以用NPM方式作为备选（虽然官方标记为已废弃，但还能用）：

```bash
# 前提：已安装 Node.js 18+
npm install -g @anthropic-ai/claude-code
```

| 对比 | 原生安装 ⭐ | NPM安装 ⚠️ |
|------|-----------|-----------|
| 需要Node.js | ❌ 不需要 | ✅ 需要 18+ |
| 安装时间 | ⏱ 3-5分钟 | ⏱ 30-40分钟 |
| 自动更新 | ✅ 后台自动 | ❌ 需手动运行 |
| 推荐度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 配置环境变量

装好Claude Code后，需要配置API Key。

### Windows PowerShell

```powershell
# 永久配置（推荐）
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-api03-你的key', 'User')
# 重启终端生效
```

### macOS / Linux

```bash
# 编辑shell配置文件
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-你的key"' >> ~/.zshrc
source ~/.zshrc
```

### 验证配置是否生效

```bash
# macOS / Linux
echo $ANTHROPIC_API_KEY

# Windows PowerShell
echo $env:ANTHROPIC_API_KEY
```

显示了完整的Key就说明配置成功了。

---

## 首次启动与验证

### 启动方式

```bash
# 标准交互模式（最常用）
claude

# 单次执行（问完就退出）
claude "帮我用Python写一个计算器"

# 打印模式（纯文本输出）
claude -p "2+2等于几"
```

### 第一次启动会经历什么？

首次运行 `claude` 时，会有一个配置向导：

1. **选择主题**：Light（浅色）/ Dark（深色）/ System（跟随系统）
2. **安全须知确认**：确认你理解Claude Code的权限范围
3. **目录信任确认**：选择是否信任当前工作目录
4. **认证方式**：选择API Key方式

### Hello World 快速验证

启动成功后，立刻做个测试确认所有功能正常：

```bash
> 帮我创建一个 hello.py 文件，内容是打印 "Hello Claude Code"
```

AI会请求你确认创建文件，确认后文件就生成好了。跑一下看看：

```bash
python hello.py
# 输出：Hello Claude Code
```

✅ 到这步说明全部安装配置成功！

---

## 常见问题急救站

### Q1: command not found / 'claude' 不是内部或外部命令

**原因**：安装目录没加到PATH环境变量。

**Windows解决方法：**
```powershell
# 先确认文件确实存在
Test-Path "$env:USERPROFILE\.local\bin\claude.exe"
# 返回 True 的话，按上面的步骤配PATH
```

**macOS/Linux解决方法：**
```bash
ls ~/.local/bin/claude
# 文件存在就加PATH
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Q2: API Key 无效

```json
{ "error": { "type": "authentication_error" } }
```

**可能的原因：**
- Key复制时多了空格或少了字符
- Key已被删除或过期
- 用了旧格式的Key

**解决：** 登录 Console 重新创建Key。

### Q3: 网络连接不上

```bash
# 配置代理（国内用户常见）
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
# 或使用API中转站
```

---

## 小结

安装总共就三步：**拿Key → 装Claude Code → 配环境变量**，快的5分钟搞定。

装好了？推荐继续学习：
- [Claude Code 交互模式完全指南](/academy/claude-code-basics)
- [用Claude Code做需求分析：如何正确提问](/academy/claude-code-requirements)

*本文学自老金老师的Claude Code系列课程，推荐去听完整课程！*
