/**
 * 站点全局配置 —— 供所有页面/组件引用，避免硬编码。
 */
export const SITE = {
  name: 'A某人',
  enName: 'A-Ren',
  title: 'A某人 · 个人博客',
  description: '一个 AI 工程师的自我修养：代码、命理与人间。',
  url: 'https://a-mouren.github.io',
  lang: 'zh-CN',
  tagline: '白天写代码 · 晚上排命盘',
  heroTagline: 'an ai engineer driven by code, astrology & games',
  author: '姜高辉',
  email: 'a-mouren@example.com',
  heroEyebrow: 'Portfolio · 2026',
};

/** 主导航（首页锚点 + 内页） */
export const NAV = [
  { label: '项目', href: '/#projects' },
  { label: '命理', href: '/mingli' },
  { label: '生活', href: '/life' },
  { label: '关于', href: '/about' },
];

/** 三大栏目元信息 */
export const CATEGORIES = {
  ai: { label: 'AI·技术', en: 'AI & Tech', desc: 'RAG · Agent · 大模型落地，我的技术实践与复盘。', href: '/ai' },
  mingli: { label: '玄学命理', en: 'Astrology', desc: '八字 · 紫微斗数，「终南逸士」推演体系的文字输出。', href: '/mingli' },
  life: { label: '生活·游戏', en: 'Life & Games', desc: '求职记录、游戏日常、AI 创作，一个普通人的人间。', href: '/life' },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

/** 技能「四艺」数据（首页夜区块） */
export const SKILLS = [
  { num: '01', name: 'AI 应用开发', wuxing: '五行 · 火', desc: 'RAG / Agent / 大模型落地，从对话机器人到自动化工作流，把 AI 变成真实可用的产品。' },
  { num: '02', name: '前端设计', wuxing: '五行 · 金', desc: '讲究的 taste-skill 设计体系，从落地页到完整产品，追求有质感、不落俗套的界面。' },
  { num: '03', name: '命理推演', wuxing: '五行 · 水', desc: '八字命理 · 紫微斗数，「终南逸士」完整推演体系，传统智慧与现代解释的结合。' },
  { num: '04', name: 'AI 视频创作', wuxing: '五行 · 木', desc: '废铁纪元 AI 动作短片，从剧本到成片的全流程 AI 影视制作能力。' },
] as const;

/** AI 工具链（关于页「Toolbox」板块，按用途分组） */
export const TOOLCHAIN_GROUPS = [
  {
    cat: '编码 Agent',
    tools: [
      { name: 'Claude Code', role: '主力：开发、重构、多 Agent 团队协作' },
      { name: 'OpenCode', role: '终端内多模型切换、批量脚本' },
      { name: 'Hermes', role: '记忆驱动的辅助 Agent，自动沉淀知识库' },
      { name: 'Cursor', role: 'AI 原生编辑器，日常写码环境' },
      { name: 'Codex', role: 'OpenAI 编码智能体，配合主力流' },
    ],
  },
  {
    cat: '自动化',
    tools: [
      { name: 'Kimi WebBridge', role: '真实浏览器操控：导航、点按、填表、截图' },
      { name: '飞书 CLI / API', role: '企业协作、通知、工作流自动化' },
      { name: '批量投递脚本', role: 'BOSS / 智联自动投递（累计 192 次）' },
    ],
  },
  {
    cat: '知识 · 记忆',
    tools: [
      { name: 'Obsidian Vault', role: '跨 Agent 共享知识库（MCP 读写）' },
      { name: 'codebase-memory', role: '代码知识图谱，跨会话理解代码' },
    ],
  },
  {
    cat: '设计 · 内容',
    tools: [
      { name: 'taste-skill 体系', role: '13 个子技能，前端高级感设计规范' },
      { name: 'The Agency · 232 专家', role: '按任务类型路由到专家 Agent' },
      { name: 'AI 视频管线', role: '废铁纪元：剧本 → 成片全流程' },
    ],
  },
] as const;

/** 首页跑马灯数据（作品 + 干支/卦符夜块） */
export const MARQUEE_ROWS = [
  [
    { label: 'Firefly 虚拟人', variant: 't1' },
    { label: '', variant: 'symbol', chars: '子丑寅卯', tall: true },
    { label: 'RAG 客服', variant: 't2' },
    { label: '', variant: 'symbol', chars: '☰☱☲☳', wide: true },
    { label: 'JobMate', variant: 't3' },
    { label: '终南逸士', variant: 't4', tall: true },
    { label: '', variant: 'symbol', chars: '申酉戌亥' },
    { label: '废铁纪元', variant: 't5' },
    { label: '香港注册AI', variant: 't6', wide: true },
    { label: '', variant: 'symbol', chars: '☴☵☶☷' },
    { label: 'Firefly 虚拟人', variant: 't1' },
  ],
  [
    { label: 'RAG 客服', variant: 't2', wide: true },
    { label: '终南逸士', variant: 't4' },
    { label: '', variant: 'symbol', chars: '☰☷☵' },
    { label: '废铁纪元', variant: 't5', tall: true },
    { label: 'Firefly 虚拟人', variant: 't1' },
    { label: '', variant: 'symbol', chars: '甲申己亥', wide: true },
    { label: 'JobMate', variant: 't3' },
    { label: '香港注册AI', variant: 't6' },
    { label: 'RAG 客服', variant: 't2', tall: true },
  ],
] as const;
