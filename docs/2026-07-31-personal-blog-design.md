# A某人 个人博客 — 设计文档

- **日期**: 2026-07-31
- **状态**: 已批准（用户审阅通过）
- **技术栈**: Astro + React islands (Framer Motion) + Tailwind CSS
- **项目路径**: `D:\Backup\Desktop\personal-blog`

---

## 1. 概述

「A某人」是姜高辉的个人品牌博客，定位为 **个人品牌 + 求职作品集 混合**：既面向读者/粉丝展示多面内容（AI 技术、玄学命理、生活游戏），又能作为求职作品集呈现给雇主。

**品牌签名元素**（全站差异化符号）：
- 天干地支罗盘（四柱八字：甲申 丙寅 己巳 甲子）
- 朱砂印章落款「某人」
- 萤火绿 + 墨色的「昼与夜」色彩概念
- 大字 Kanit 标题 + 中文宋体标题

---

## 2. 已确认决策

| 维度 | 决策 |
|---|---|
| 定位 | 个人品牌 + 求职作品集 混合 |
| 品牌名 | **A某人**（英文侧 A-Ren / AMouren） |
| 视觉 | 浅纸色底 + 萤火绿主色 + 墨色夜区块 + 朱砂印章 |
| 栏目 | AI·技术项目 / 玄学命理 / 生活·游戏 |
| 技术栈 | Astro（静态内容站）+ React island 做动画层 |
| 动效库 | Framer Motion |
| 样式 | Tailwind CSS v3（设计 token 统一） |
| 内容 | 仓库内直接写 Markdown（Content Collections） |
| 功能 | 全站搜索（Pagefind）+ RSS（@astrojs/rss） |
| 部署 | GitHub Pages + GitHub Actions |
| 字体 | 本地化（Kanit 拉丁 + 思源宋体/思源黑体中文本地文件），不用 Google Fonts CDN |
| 不做 | 评论区、阅读量统计、Obsidian 自动同步管线（本期不做） |

---

## 3. 信息架构

### 3.1 首页（单页叙事）

| 序号 | 区块 | 内容 |
|---|---|---|
| 1 | 导航 | 悬浮玻璃 pill：品牌（朱砂印章+A某人）· 项目/命理/生活/关于 · 萤火绿「联系」 |
| 2 | Hero | 眉题「Portfolio · 2026」→ 巨型渐变「A某人」+ 朱砂落款印章 → 天干地支罗盘（四柱居心、双虚线环缓转、卦符+干支环绕、漂浮干支粒子）→ 底部 tagline「an ai engineer driven by code, astrology & games」+ 萤火绿磁吸 CTA |
| 3 | 跑马灯 | 双行反向滚动图像带（作品图 + 干支/卦符暗色夜块），非对称尺寸 + 微倾斜 |
| 4 | 关于我 | 眉题「About」+ 大字标题 + 逐字浮现文案 + Lv 徽章（Lv.22 · ShenZhen · AI Engineer） |
| 5 | 技能「四艺」 | **墨色夜区块**（圆角上拉）：01 AI应用 / 02 前端设计 / 03 命理推演 / 04 AI视频，萤火绿发光编号 + 五行标签 |
| 6 | 项目 | sticky 叠卡（缩放层叠）：Firefly 虚拟人(☲火)、RAG 客服Agent(☵水)、JobMate、终南逸士… |
| 7 | 页脚 | 眉题「白天写代码 · 晚上排命盘」+ 大字 A某人 + 朱砂落款印章 |

### 3.2 内页

- **文章列表页**：三大栏目（AI·技术 / 玄学命理 / 生活·游戏），卡片式 + 标签过滤
- **文章详情页**：排版重心——大标题、阅读时间、图注、代码块、目录（TOC）、上一篇/下一篇导航
- **关于页**：求职作品集载体——简介、技能、项目、简历下载、联系方式
- **标签/归档页**：时间归档 + 标签云
- **404 页**：罗盘/干支彩蛋

---

## 4. 设计系统

### 4.1 配色（CSS 变量 / Tailwind token）

| Token | 值 | 用途 |
|---|---|---|
| `--paper` | `#F4F0E5` | 主背景（纸色·昼） |
| `--card` | `#FFFFFF` | 卡片背景 |
| `--ink` | `#1B1912` | 主文字（墨色） |
| `--ink-soft` | `rgba(27,25,18,.6)` | 次级文字 |
| `--firefly` | `#BCF01B` | 主色（萤火绿） |
| `--firefly-deep` | `#8FBF0B` | 深绿（可读性） |
| `--night` | `#14120C` | 夜区块背景 |
| `--night-text` | `#E7E0CF` | 夜区块文字 |
| `--verm` | `#C0392B` | 朱砂（印章/落款） |

- 大标题渐变（昼）：`linear-gradient(180deg,#4A463A,#171410)` clip-text
- 大标题渐变（夜）：`linear-gradient(180deg,#7A7261,#E8E0CF)` clip-text
- 萤火绿光晕：`rgba(188,240,27,.4)`

### 4.2 字体

- **Kanit**（拉丁/数字，900 重型标题）：本地 woff2，用于大字标题、编号、英文 tagline
- **中文标题**：思源宋体（Noto Serif SC）或宋体系，配玄学气质
- **正文**：思源黑体（Noto Sans SC）
- 全部本地化字体，fallback 栈合理

### 4.3 核心组件

1. **Double-Bezel 双层卡片**：外壳（白底 70%、毛发描边、外大圆角 `20px`、环境阴影）+ 内芯（纯白、内高光、同心小圆角 `15px`）
2. **按钮内嵌箭头（Button-in-Button）**：文字 + 独立圆形箭头容器，悬停斜移放大
3. **眉题 pill（Eyebrow）**：`10px / letter-spacing .30em / uppercase`，前置萤火绿发光圆点
4. **朱砂印章**：方形红印，右上角落款（`right:-0.45em; top:14%`，旋转 7°）
5. **天干地支罗盘**：320px，十二地支环 + 八卦符号 + 双虚线反向缓转环 + 墨色核心（四柱）
6. **磁吸 CTA**：萤火绿底 + 墨字 + 内箭头 + 绿色光晕

---

## 5. 动效规范（一等需求）

> 用户明确要求：UI 动画、动态效果、排版细节是**验收标准**，非锦上添花。

**通用原则**
- 只用 `transform` / `opacity`，禁用布局触发属性（top/left/width/height）
- 自定义 cubic-bezier（`cubic-bezier(.32,.72,0,1)`），禁用 `linear`/`ease-in-out`
- 视口触发动画用 Framer Motion `whileInView`（`viewport={{ once:true }}`），禁止 `window.addEventListener('scroll')`
- `backdrop-blur` 只用于 fixed/sticky（导航），不用在滚动内容
- 动效时长基准 500-900ms

**区块动效清单**

| 元素 | 动效 |
|---|---|
| 全站入场 | fade-up + blur（`translate-y-16 blur-md → 0`，800ms+） |
| 磁吸按钮 | 悬停鼠标跟随 + 内箭头 `translate(3px,-3px) scale(1.06)` + `active:scale(.97)` |
| 跑马灯 | 随滚动双行反向位移（`(scrollY - sectionTop + innerHeight) * .3`） |
| 逐字浮现 | 关于段落字符按滚动进度 opacity `0.2 → 1`（offset `['start .8','end .2']`） |
| 项目叠卡 | sticky `top-24`，滚动缩放 `targetScale = 1 - (n-1-i)*.03` |
| 罗盘 | 双虚线环反向缓转（46s/30s）+ 中心光晕呼吸 |
| 萤火夜区块 | 技能编号绿光脉冲（`text-shadow` 呼吸） |
| 干支粒子 | 漂浮上下微移（`drift` 13s） |
| 导航 | 悬浮 pill，滚动后加深实底 |

---

## 6. 技术架构

### 6.1 工程结构

```
personal-blog/
├─ src/
│  ├─ content/                 # Markdown 内容集合
│  │  ├─ ai/  mingli/  life/   # 三大栏目
│  │  └─ config.ts             # schema（标题/栏目/标签/日期/摘要/封面）
│  ├─ components/
│  │  ├─ motion/               # React island：MagneticButton, Marquee, StickyCards,
│  │  │                        #   AnimatedText, ScrollFade, CompassWheel
│  │  └─ ui/                   # Astro 组件：Eyebrow, Seal, DoubleBezel, CTA
│  ├─ layouts/                 # BaseLayout, ArticleLayout, PageLayout
│  ├─ pages/                   # 首页 / 栏目页 / 文章页 / 关于 / 归档 / 404
│  └─ styles/                  # tailwind + 设计 token + 字体声明
├─ public/fonts/               # 本地字体 woff2
├─ astro.config.mjs
├─ tailwind.config.cjs
└─ .github/workflows/deploy.yml # GitHub Pages 部署
```

### 6.2 关键依赖
- `astro`、`@astrojs/react`、`@astrojs/rss`、`@astrojs/tailwind`
- `react` / `react-dom`（^18.3.1）
- `framer-motion`（^12.x）
- `pagefind`（全站搜索，Astro 集成）
- `@fontsource` 系列 或 手拷字体文件（本地化）

### 6.3 数据流
- 静态内容：Content Collections → 页面渲染（SSG 零 JS）
- 动画：仅 React island 客户端水合（island:load）
- 搜索：Pagefind 构建时生成静态索引，前端 fetch 索引（无后端）
- RSS：构建时生成 `rss.xml`

### 6.4 部署
- GitHub Actions：`push` → `npm ci && npm run build && pagefind` → 部署到 `gh-pages`
- 仓库名 `a-mouren.github.io`（或任意名 + workflow 部署 Pages）
- 无自定义域名（本期），后续可加

---

## 7. 内容策略

### 7.1 栏目 schema
`title / description(摘要) / pubDate / category(ai|mingli|life) / tags[] / cover(可选) / draft(可选)`

### 7.2 首批内容（5-6 篇撑起骨架）
1. AI·技术：《入职 AI 应用岗的第一天》
2. AI·技术：《RAG 客服 Agent 实践复盘》
3. 玄学命理：《丙申月流月推演》（终南逸士出品）
4. 生活：《深圳求职记：178 份简历之后》
5. AI·技术：《Firefly 虚拟人踩坑记》
6. 生活·游戏：《崩铁二相乐园速览》

### 7.3 求职作品集
关于页承载：个人简介、技能树（四艺）、代表性项目（Firefly / RAG / JobMate / 香港注册AI / 终南逸士）、简历、联系方式。

---

## 8. 响应式、性能、无障碍

- **响应式**：移动优先，`clamp()` 流式排版；>768px 非对称网格，<768px 单列 `w-full px-4`；禁用 `h-screen`（用 `min-h-[100dvh]`）
- **性能**：图片懒加载 + 尺寸占位；字体 subset；动画视口内触发；`will-change` 仅用于动画中的元素
- **无障碍**：文字对比度 ≥ 4.5:1（深绿替代萤火绿用于正文/链接）；键盘焦点态可见；语义化 HTML（nav/main/article/aside/footer）；`prefers-reduced-motion` 降级为静态

---

## 9. 验收标准（Checklist）

- [ ] 首页七区块全部实现，顺序与 3.1 一致
- [ ] 五大动效到位：入场 fade-up、磁吸 CTA、跑马灯滚动驱动、逐字浮现、sticky 叠卡
- [ ] 罗盘：十二地支 + 八卦 + 四柱 + 双环缓转 + 光晕呼吸
- [ ] 昼/夜概念：纸色主体 + 墨色技能夜区块 + 萤火绿发光编号
- [ ] 全站搜索可用（Pagefind），RSS 生成正常
- [ ] 三大栏目文章列表 + 文章详情排版（TOC、代码块、上一篇/下一篇）
- [ ] 关于页可作求职作品集
- [ ] 移动端无破版，无横向滚动
- [ ] 本地化字体，国内访问不依赖 Google Fonts
- [ ] GitHub Pages 部署成功，push 即发布
- [ ] 无 `linear`/`ease-in-out`，无 scroll 监听，无布局属性动画

---

## 10. 非目标（本期不做）

评论区、阅读量统计、Obsidian→博客自动同步管线、多作者、多语言、自定义域名/备案、暗色模式切换。
