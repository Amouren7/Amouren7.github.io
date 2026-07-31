# CLAUDE.md — A某人 个人博客

「A某人」（姜高辉）的个人品牌博客：AI 技术 / 玄学命理 / 生活游戏。个人品牌 + 求职作品集混合定位。

## 技术栈
- **Astro 5**（静态内容站）+ React island + **Framer Motion 12** + **Tailwind CSS 3**
- **Pagefind**（全站搜索，`npm run build` 后生成索引）+ `@astrojs/rss`
- 动效纪律：只用 `transform/opacity`，自定义 cubic-bezier（`.32,.72,0,1`），禁用 `window scroll` 监听

## 常用命令（仓库根 `D:\CC project\personal-blog`）
```bash
npm run dev        # 本地开发（localhost:4321）
npm run build      # 构建 + Pagefind 索引
npm run preview    # 预览构建产物
```

## 发布流程
写内容 → `git add -A && git commit -m "…" && git push` → GitHub Actions 自动构建部署，约 1 分钟上线。
**仓库**：`Amouren7/Amouren7.github.io`，**线上**：https://Amouren7.github.io/
网络：直连 git push 可用；若 github.com 被墙，`git config http.proxy http://127.0.0.1:7897`。

## 内容在哪
- 博客文章：`src/content/blog/{ai,mignli,life}/*.md`（frontmatter: `title/description/pubDate/category/tags/draft`）
- 项目详情：`src/content/projects/*.md`（首页卡片剧场与关于页自动读取）
- 站点资料：`src/config.ts`（`SITE` / `TOOLCHAIN_GROUPS` / `SKILLS`）
- 内容 schema：`src/content/config.ts`；内容模板：`docs/content-guide.md`

## 🔴 隐私红线（写命理内容必读）
**禁止在公开内容出现能反推用户精确生辰的信息**：自己的四柱组合、出生年月日时/年份、个人大运区间、个人命盘五行占比。
允许：通用干支、八卦、太极、五行、`己土日主` 等通用日主分类。已全站脱敏，新内容照此红线执行。

## 设计系统
- 视觉：浅纸底 `#F4F0E5` + 萤火绿 `#BCF01B`（正文用深绿 `#4E7000` 保证对比度）+ 墨色夜区块 + 朱砂印章 `#C0392B`
- 品牌：天干地支罗盘（中心为太极）、朱砂印章落款、Kanit + 宋体中文字体
- 设计 token 在 `src/styles/global.css`；核心组件在 `src/components/motion/`（React island）与 `src/components/ui/`
- 完整设计文档：`docs/2026-07-31-personal-blog-design.md`

## 深入文档
| 主题 | 文档 |
|---|---|
| 设计系统 / 动效规范 / 验收清单 | `docs/2026-07-31-personal-blog-design.md` |
| 内容发布 / 文章模板 / 隐私红线 | `docs/content-guide.md` |
| 项目实施计划（历史） | `docs/2026-07-31-implementation-plan.md` |
