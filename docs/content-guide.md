# 📝 内容发布指南

本指南说明如何写文章 / 改项目 / 更新资料并发布上线。

## 发布流程（3 步）

打开终端（Git Bash），依次执行：

```bash
cd D:/CC project/personal-blog

# 写完内容后，三步发布：
git add -A
git commit -m "post: 文章标题"
git push
```

`git push` 后约 **1 分钟**，线上自动更新（GitHub 服务器 24 小时在线，不用一直开着电脑）。
> 当前 git 直连即可 push；若遇网络不通（github.com 被墙），开代理软件或执行
> `git config http.proxy http://127.0.0.1:7897` 后再 push。

线上地址：**https://Amouren7.github.io/**

---

## 🔒 隐私红线（重要）

**公开内容里禁止出现能反推个人精确生辰的信息**（四柱组合 ≈ 精确出生日期+时辰）：

| 🚫 禁止 | ✅ 允许 |
|---|---|
| 自己的四柱组合（如 `甲〇 乙〇 丙〇 丁〇` 这类「年柱·月柱·日柱·时柱」四对干支） | 通用干支（子丑寅卯 / 天干地支） |
| 出生年月日时 / 出生年份 | 泛化的「这个年纪」 |
| 个人大运区间（如 戊辰 14-23 岁） | 「十年一运」的方法论描述 |
| 个人命盘五行占比 | 日主强弱、用神忌神等通用概念 |
| 拿自己四柱当「样本案例」 | 「己土日主」等通用日主分类 |

通用玄学符号（干支、八卦、太极、五行、日主分类）可放心使用——它们不指向具体个人。写命理文章时若不确定，宁可用通用日主分类，也别贴个人四柱。

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
