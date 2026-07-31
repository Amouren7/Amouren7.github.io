# 📝 内容发布指南

本指南说明如何写文章 / 改项目 / 更新资料并发布上线。

## 发布流程（3 步）

打开终端（Git Bash），依次执行：

```bash
cd D:/Backup/Desktop/personal-blog

# 写完内容后，三步发布：
git add -A
git commit -m "post: 文章标题"
git push
```

`git push` 后约 **1 分钟**，线上自动更新（GitHub 服务器 24 小时在线，不用一直开着电脑）。
> git 代理已配置好，直接 push 即可，无需额外操作。

---

## 📄 写博客文章

### 文件放哪

```
src/content/blog/
├─ ai/      # AI·技术 栏目
├─ mingli/  # 玄学命理 栏目
└─ life/    # 生活·游戏 栏目
```

**文件名**：`日期-英文短横线slug.md`，例如 `2026-08-05-rag-jiaocheng.md`

### 文章模板（复制改）

```markdown
---
title: 文章标题
description: 一句话摘要（显示在列表卡片和搜索结果里）
pubDate: 2026-08-05
category: ai          # ai | mingli | life
tags: [标签1, 标签2]
draft: false          # true=先存草稿不发布；false=发布
---

正文从这里开始，用 Markdown 写……

## 二级标题
- 列表
- 代码块用 ``` 包裹
```

### 草稿机制
- `draft: true` → 暂不发布（不进网站、不进 RSS、不进搜索），改回 `false` 并 push 即发布。

---

## 🛠 项目详情页

### 文件放哪

```
src/content/projects/   # 例如 firefly.md、rag-kefu-agent.md
```

### 项目模板

```markdown
---
title: 项目名
num: "01"
cat: "<b>☲ 火</b> · AI Application"   # 卦象 + 分类
summary: 一句话简介
tech: [技术1, 技术2]
metrics:
  - value: "82%"
    label: 评测通过率
images:
  a: 图1标签
  b: 图2标签
  c: 图3标签
draft: false
---

## 项目简介
……正文用 Markdown……
```

---

## ⚙️ 站点资料（邮箱/简介/工具链）

- **邮箱 / 站点名 / 简介**：`src/config.ts` 里的 `SITE` 对象
- **AI 工具链**：`src/config.ts` 里的 `TOOLCHAIN_GROUPS`
- **技能四艺**：`src/config.ts` 里的 `SKILLS`

改完同样 `git push` 发布。

---

## 常见问题

| 问题 | 解决 |
|---|---|
| 改完没看到变化 | 确认 push 成功 + 等 1 分钟刷新 |
| 不想删旧文章 | 改 `draft: true` 隐藏，而不是删文件 |
| 本地预览 | `npm run dev` 后开 http://localhost:4321 |
