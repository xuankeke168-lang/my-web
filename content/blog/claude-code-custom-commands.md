---
title: 'Claude Code 自定义命令：把重复工作变成一键搞定'
date: '2026-04-25'
category: 工具
tags: ['Claude Code', 'AI编程', '自定义命令', '效率']
---

# Claude Code 自定义命令：把重复工作变成一键搞定

> 学习来源：跟老金老师学的 Claude Code 系列课程

每天写代码都在重复说"帮我审查代码，注意安全性、可读性、性能"？或者每天都要问"帮我分析一下这个文件的复杂度"？

**自定义命令**就是解决这个问题的——把那些你天天要说的需求，做成一个快捷键，一键执行。

---

## 一、自定义命令是啥？

简单说就是**你自己创建的快捷指令**。

打个比方：
- 别人要说一整段话 → 你输入 `/review` 就搞定
- 别人要分步骤描述 → 你输入 `/api` 生成API模板
- 别人要贴一堆规范 → 你输入 `/test` 自动生成测试

```bash
# 没有自定义命令
> 帮我审查一下 src/utils/auth.js 这个文件，
# 关注以下几点：1. 安全检查有没有遗漏...
# 2. 代码可读性... 3. 性能...

# 有自定义命令
> /review src/utils/auth.js
# 同样的审查，一句话搞定！
```

---

## 二、怎么创建？步骤拆解

### 第一步：创建命令目录

```bash
# 在项目根目录创建
mkdir -p .claude/commands
```

### 第二步：创建命令文件（Markdown格式）

每个命令就是一个 `.md` 文件，文件名就是命令名：

```
.claude/commands/
├── review.md         # → /review 命令
├── test.md           # → /test 命令
├── api.md            # → /api 命令
├── refactor.md       # → /refactor 命令
├── docs.md           # → /docs 命令
└── commit.md         # → /commit 命令
```

### 第三步：编写命令内容

```markdown
---
description: 代码审查 - 安全、性能、可读性全面检查
---

# 代码审查

请帮我审查以下代码路径的代码，按照以下维度分析：

## 审查维度

1. **安全性**（最高优先级）
   - 是否有SQL注入风险
   - 是否有XSS漏洞
   - 是否有敏感信息泄露
   - 输入验证是否充分

2. **性能**
   - 是否有N+1查询
   - 是否有不必要的重渲染
   - 是否有内存泄漏风险

3. **可维护性**
   - 命名是否清晰
   - 是否有重复代码
   - 函数是否过长

## 审查范围

$ARGUMENTS

## 输出格式

请按此格式输出：
```
## 审查结果
### 严重问题: ...
### 建议改进: ...
### 做得好的: ...
### 综合评分: ...
```
```

**关键：** `$ARGUMENTS` 就是命令接收的参数，下面会详细讲。

---

## 三、$ARGUMENTS 参数机制

`$ARGUMENTS` 是你命令的"输入插槽"：

```bash
/review src/utils/auth.js
# → $ARGUMENTS = "src/utils/auth.js"

/review src/utils/auth.js src/utils/db.js
# → $ARGUMENTS = "src/utils/auth.js src/utils/db.js"

/review
# → $ARGUMENTS = ""（空，可以在命令模板里做默认处理）
```

**在模板中引用：**

```markdown
## 审查范围
路径：$ARGUMENTS

如果没有指定路径，默认审查最近修改的文件。
```

---

## 四、6个实战命令模板（复制就能用）

### 1. `/review` — 代码审查

文件：`.claude/commands/review.md`

```markdown
---
description: 代码审查 - 全面检查安全、性能、可维护性
---

请审查以下代码，按优先级关注：

1. **安全性**：SQL注入、XSS、CSRF、敏感信息泄露、权限检查
2. **性能**：算法复杂度、不必要的渲染、内存泄漏、网络请求
3. **代码质量**：命名规范、函数长度、重复代码、错误处理

代码路径或片段：
$ARGUMENTS

如果能直接读取文件，请直接读取后分析。如果是代码片段，则分析片段。
```

---

### 2. `/test` — 生成测试用例

文件：`.claude/commands/test.md`

```markdown
---
description: 为指定文件生成单元测试
---

请为以下文件生成测试用例：

源文件：$ARGUMENTS

要求：
1. 使用 Jest 测试框架
2. 覆盖正常路径、边界条件、异常路径
3. 使用 describe/it 组织测试结构
4. Mock 外部依赖

输出：
1. 测试文件完整代码
2. 测试覆盖率分析
3. 需要手动补充的测试点（如果有）
```

---

### 3. `/api` — 生成API接口

文件：`.claude/commands/api.md`

```markdown
---
description: 生成 RESTful API 接口（路由+控制器+验证）
---

请为以下资源生成完整的 RESTful API：

资源名称：$ARGUMENTS

要求：
1. 遵循 RESTful 规范
2. 包含 CRUD 操作
3. 包含请求验证（express-validator / zod）
4. 包含错误处理
5. 返回统一的 JSON 格式

技术栈：Express + MongoDB（Mongoose）

输出格式：
- 路由文件
- 控制器文件
- 验证中间件
- 数据模型
```

---

### 4. `/refactor` — 重构建议

文件：`.claude/commands/refactor.md`

```markdown
---
description: 分析代码重构方案
---

请分析以下代码的重构方案：

$ARGUMENTS

分析维度：
1. **当前问题**：这段代码有哪些痛点
2. **重构方案**：建议怎么改，为什么
3. **风险分析**：重构可能引入什么风险
4. **迁移步骤**：如果建议大改，请给出分步迁移方案

请保持重构前后功能完全一致。
```

---

### 5. `/docs` — 生成文档

文件：`.claude/commands/docs.md`

```markdown
---
description: 生成代码文档注释和README
---

请为以下代码生成文档：

$ARGUMENTS

输出内容：
1. JSDoc 注释（每个导出函数）
2. 参数说明和类型
3. 返回值说明
4. 使用示例
5. 注意事项（如果有边界情况）
```

---

### 6. `/commit` — 生成commit message

文件：`.claude/commands/commit.md`

```markdown
---
description: 分析git diff并生成commit message
---

请分析当前的 git diff，生成规范的 commit message：

要求：
1. 使用 Conventional Commits 格式（feat/fix/refactor/docs/test/chore）
2. 用中文描述变更内容
3. 按文件分组说明改动

先执行 git diff 查看变更，然后生成 commit message。
```

---

## 五、进阶技巧

### 技巧1：多步骤命令

自定义命令不只是"一句话模板"，还能设计成多步骤工作流：

```markdown
---
description: 新功能完整工作流：模型→API→测试
---

请按以下步骤帮我完成一个新功能开发：

功能需求：
$ARGUMENTS

步骤：
1. 先帮我设计数据模型（Mongoose Schema）
2. 然后生成 CRUD 路由和控制器
3. 再生成验证中间件
4. 最后生成测试用例
5. 汇总所有文件清单

每一步完成后请等待我确认，再继续下一步。
```

### 技巧2：带默认值处理

```markdown
---
description: 性能分析（默认当前文件）
---

请分析以下代码的性能瓶颈：

$ARGUMENTS

如果没有指定文件，请分析最近一次修改的文件。
```

### 技巧3：全局命令 vs 项目命令

```
# 项目级命令（只对当前项目生效）
my-project/.claude/commands/review.md

# 全局命令（对所有项目生效）
~/.claude/commands/review.md
```

**组织建议：**
- 项目专用命令（跟业务逻辑相关）→ 放项目目录
- 通用命令（审查、测试等）→ 放全局目录
- 同名时，项目级命令优先于全局命令

---

## 六、我的自定义命令使用习惯

这是我现在每天都在用的几个命令：

| 命令 | 使用频率 | 说人话多少 |
|------|---------|-----------|
| `/review` | 每天N次 | 从30秒→2秒 |
| `/test` | 每天2-3次 | 从20秒→2秒 |
| `/commit` | 每次提交 | 从15秒→1秒 |
| `/api` | 每周几次 | 从30秒→2秒 |
| `/refactor` | 每周几次 | 从20秒→2秒 |

**使用流程：**

```bash
# 打开项目，开始工作
cd my-project
claude

# 完成一个功能后
> /checkpoint 完成用户列表

# 审查代码
> /review src/controllers/user.js

# 生成测试
> /test src/controllers/user.js

# 提交代码
> /commit
```

---

## 七、常见问题

**Q: 命令文件支持哪些格式？**
A: 目前支持 Markdown（.md）格式。文件内容就是发给AI的prompt模板。

**Q: 命令文件名有什么规则？**
A: 文件名就是命令名。比如 `review.md` 对应 `/review`。建议全部小写字母，多个单词用中划线连接。

**Q: 修改命令文件后需要重启Claude Code吗？**
A: 是的，修改后需要重启才能生效。

**Q: 自定义命令和Slash命令冲突了怎么办？**
A: 内置命令（如 `/help`、`/clear`）优先级更高。自定义命令不能覆盖内置命令。

**Q: 团队怎么共享自定义命令？**
A: 把 `.claude/commands/` 目录提交到Git仓库，团队成员拉下来直接用。

---

## 总结

自定义命令的精髓就是：**一次配置，永久复用**。

花10分钟配好常用的几个命令，以后每次省5-10秒。一天用10次，一周就是几百次——这投资回报率，不比任何工具都高？

建议从 `review.md` 开始配，这是使用频率最高的命令，配好就能感受到效率提升。

*本文学自老金老师的Claude Code系列教程。*
