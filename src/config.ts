/**
 * 站点全局配置 —— 供所有页面/组件引用，避免硬编码。
 */
export const SITE = {
  name: 'A某人',
  enName: 'A-Ren',
  title: '姜高辉 · AI 应用落地作品集',
  description: '姜高辉的个人作品集与博客，记录 AI 应用在真实业务中的设计、验证与持续迭代。',
  url: 'https://Amouren7.github.io',
  lang: 'zh-CN',
  tagline: '把 AI 用进真实业务 · 在场景中持续迭代',
  heroTagline: 'AI APPLICATIONS · AGENT WORKFLOWS · REAL BUSINESS',
  author: '姜高辉',
  email: '3384989556@qq.com',
  heroEyebrow: 'Portfolio · 2026',
};

/** 主导航（首页锚点 + 内页） */
export const NAV = [
  { label: '项目', href: '/#projects' },
  { label: '关于', href: '/about' },
  { label: 'AI·技术', href: '/ai' },
  { label: '生活', href: '/life' },
  { label: '命理', href: '/mingli' },
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
  { num: '01', name: 'AI 应用落地', wuxing: '需求 · 场景 · 交付', desc: '从一线流程梳理开始，推动大模型能力进入真实工作环节，并根据使用反馈持续迭代。' },
  { num: '02', name: 'Agent 与 RAG', wuxing: '上下文 · 检索 · 评估', desc: '关注任务边界、知识依据与多轮上下文，让 AI 输出更贴合业务目标、也更容易验证。' },
  { num: '03', name: '业务流程自动化', wuxing: '提取 · 校验 · 协作', desc: '连接模型与既有工具，在系统没有开放接口时设计可控的人机协同流程。' },
  { num: '04', name: '工程化交付', wuxing: '验证 · 部署 · 迭代', desc: '重视异常处理、回归验证、数据边界和使用体验，让原型逐步变成可维护的应用。' },
] as const;

/** AI 工具链（关于页「Toolbox」板块，按用途分组） */
export const TOOLCHAIN_GROUPS = [
  {
    cat: 'AI 应用',
    tools: [
      { name: 'Python / FastAPI', role: '构建模型服务、业务接口与轻量应用' },
      { name: '大模型 API', role: '文本理解、生成与结构化信息提取' },
      { name: 'Agent 工作流', role: '拆解任务边界，设计人机协作步骤' },
    ],
  },
  {
    cat: '知识与检索',
    tools: [
      { name: 'RAG', role: '让回答结合经过整理的业务知识' },
      { name: '向量与关键词检索', role: '按语义与词面信号定位相关内容' },
      { name: '离线评测', role: '用代表性问题集对比迭代效果' },
    ],
  },
  {
    cat: '流程自动化',
    tools: [
      { name: 'Playwright', role: '浏览器流程自动化与表单交互' },
      { name: 'SQLite / REST API', role: '轻量数据管理与服务集成' },
      { name: '桌面自动化', role: '兼容既有工具的人机协同操作' },
    ],
  },
  {
    cat: '交付质量',
    tools: [
      { name: '自动化回归', role: '保护关键行为并降低迭代风险' },
      { name: '安全边界设计', role: '限制无依据结论与越权承诺' },
      { name: '本地 / 云端部署', role: '按业务使用方式交付和维护应用' },
    ],
  },
] as const;

/** 首页跑马灯数据（作品 + 干支/卦符夜块） */
export const MARQUEE_ROWS = [
  [
    { label: '销售引导助手', variant: 't1' },
    { label: '', variant: 'symbol', chars: '子丑寅卯', tall: true },
    { label: '客户录入助手', variant: 't2' },
    { label: '', variant: 'symbol', chars: '☰☱☲☳', wide: true },
    { label: 'RAG 知识助手', variant: 't3' },
    { label: 'Firefly 对话', variant: 't4', tall: true },
    { label: '', variant: 'symbol', chars: '申酉戌亥' },
    { label: 'AI 求职工作流', variant: 't5' },
    { label: 'AI 应用落地', variant: 't6', wide: true },
    { label: '', variant: 'symbol', chars: '☴☵☶☷' },
    { label: '销售引导助手', variant: 't1' },
  ],
  [
    { label: '客户录入助手', variant: 't2', wide: true },
    { label: 'Firefly 对话', variant: 't4' },
    { label: '', variant: 'symbol', chars: '☰☷☵' },
    { label: 'AI 求职工作流', variant: 't5', tall: true },
    { label: '销售引导助手', variant: 't1' },
    { label: '', variant: 'symbol', chars: '天地玄黄', wide: true },
    { label: 'RAG 知识助手', variant: 't3' },
    { label: 'AI 应用落地', variant: 't6' },
    { label: '客户录入助手', variant: 't2', tall: true },
  ],
] as const;
