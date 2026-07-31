# A某人 个人博客 — 实施计划

- **日期**: 2026-07-31
- **依据**: `2026-07-31-personal-blog-design.md`
- **团队角色**: Lead/Architect（我） · Frontend Developer（实现） · UI Designer（设计校对） · Code Reviewer（QA）

## 阶段与分工

### Phase 0 — 工程地基（Lead）
- 初始化 Astro + React + Tailwind 工程，装依赖
- 配置：astro.config / tailwind token / tsconfig / .gitignore
- 设计 token（global.css）+ 内容集合 schema（content/config.ts）
- 产物：可 `npm run dev` 的空壳 + 字体占位

### Phase 1 — 设计系统 + 动效组件库（Frontend Developer #1）
- `src/components/ui/`：Eyebrow / Seal / DoubleBezel / CTA（Astro）
- `src/components/motion/`（React island，Framer Motion）：
  - `MagneticButton`（磁吸+内箭头）
  - `ScrollFade`（fade-up+blur 入场）
  - `AnimatedText`（逐字浮现）
  - `Marquee`（双行反向滚动）
  - `CompassWheel`（天干地支罗盘）
  - `StickyCards`（项目叠卡）
  - `FireflyGlow`（夜区块绿光脉冲）
  - `NavPill`（滚动加深）
- `BaseLayout`（head/字体/全局）

### Phase 2 — 首页七区块（Frontend Developer #2）
- Hero（眉题/大字/印章/罗盘/tagline/CTA）
- 跑马灯 / 关于（逐字+LV徽章）/ 技能夜区块 / 项目叠卡 / 页脚
- 严格按设计文档 3.1 + 动效清单 5

### Phase 3 — 内页 + 内容 + 搜索/RSS（Frontend Developer #3）
- 栏目列表页（ai/mingli/life）+ 标签/归档
- 文章详情布局（TOC/代码块/上下篇）+ ArticleLayout
- 关于页（求职作品集）+ 404
- Pagefind 接入（build 后索引）+ `@astrojs/rss`

### Phase 4 — 部署（Lead + DevOps）
- `.github/workflows/deploy.yml`（GitHub Pages）
- 首批 5-6 篇示例文章
- 本地字体落地（Kanit + 思源宋/黑）

### Phase 5 — QA 验收（Code Reviewer + UI Designer）
- 对照设计文档验收清单（第 9 节）
- 移动端无破版、动效达标、无障碍、性能

## 顺序约束
0 → 1 → (2,3 并行) → 4 → 5
组件接口（props）在 Phase 1 定义，Phase 2/3 只消费，避免并行冲突。
