# A某人 · 个人博客

姜高辉的个人品牌博客 —— **AI 技术 / 玄学命理 / 生活游戏**，兼具求职作品集功能。

🔗 **线上地址：https://Amouren7.github.io/**

## 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Astro 5（静态内容站） |
| 动画 | React island + Framer Motion 12 |
| 样式 | Tailwind CSS 3 + 设计 token |
| 搜索 | Pagefind（构建时生成索引，无后端） |
| 订阅 | RSS（`/rss.xml`） |
| 部署 | GitHub Pages + GitHub Actions（push 自动构建） |

## 快速开始

```bash
npm install
npm run dev       # 本地开发 → http://localhost:4321
npm run build     # 构建 + 搜索索引
npm run preview   # 预览构建产物
```

## 目录结构

```
src/
├─ content/
│  ├─ blog/{ai,mignli,life}/   # 博客文章（Markdown）
│  ├─ projects/                # 项目详情页（简历式介绍）
│  └─ config.ts                # 内容 schema
├─ components/
│  ├─ motion/                  # 动效组件（罗盘3D/磁吸/跑马灯/卡片剧场/萤火粒子/导航）
│  └─ ui/                      # 基础组件（眉题/印章/卡片/页脚/搜索）
├─ layouts/                    # Base / Page / Article 布局
├─ pages/                      # 首页 / 栏目 / 文章 / 项目 / 关于 / 404 / RSS
├─ config.ts                   # 站点资料（SITE/工具链/技能）
└─ styles/global.css           # 设计 token
docs/                          # 设计文档 + 内容发布指南
```

## 发布内容

写一篇文章 = 在 `src/content/blog/<栏目>/` 放一个 Markdown 文件，然后 `git push`，约 1 分钟上线。
文章模板、项目模板、**隐私红线**详见 → **[docs/content-guide.md](docs/content-guide.md)**

> ⚠️ 命理类内容有隐私红线：不得发布能反推个人精确生辰的信息（四柱/出生年月日/大运），详情见 content-guide。

## 设计

浅纸底 + 萤火绿 + 朱砂印章的「昼与夜」视觉，天干地支罗盘为品牌核心符号。
设计系统与动效规范见 → **[docs/2026-07-31-personal-blog-design.md](docs/2026-07-31-personal-blog-design.md)**

## 许可

个人站点，内容与代码归属作者本人。
