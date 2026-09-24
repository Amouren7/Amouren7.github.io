import React, { useRef } from 'react';
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import './motion.css';

interface Metric {
  value: string;
  label: string;
}

interface ProjectCard {
  num: string;
  cat: string;
  title: string;
  desc: string;
  tech: string[];
  metrics: Metric[];
  preview?: {
    src: string;
    alt: string;
    caption: string;
  };
  href?: string;
}

interface CardTheaterProps {
  cards: ProjectCard[];
}

/** 从 cat HTML（如 `<b>☲ 火</b> · AI Application`）提取卦象字符 */
function extractGua(cat: string): string {
  const m = /<b>([^<]*)<\/b>/.exec(cat);
  if (!m) return '☯';
  return m[1].trim().charAt(0) || '☯';
}

/**
 * CardTheater — 响应式 3D 项目卡片
 * - 网格自动适应卡片数量和屏幕宽度，桌面保留轻量透视
 * - 鼠标移动驱动整组卡片的弹簧视差，触屏不绑定伪 hover
 * - 键盘聚焦与鼠标悬停都有可见反馈
 * - 减少动态效果偏好下停用 3D 倾斜和入场位移
 * - 入场：每卡 opacity + y 错峰浮现（whileInView，符合只 transform/opacity）
 */
export default function CardTheater({ cards }: CardTheaterProps) {
  const reduced = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.8 });
  const sry = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.8 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || e.buttons !== 0 || reduced) return;
    const el = e.currentTarget.getBoundingClientRect();
    if (!el.width || !el.height) return;
    const px = (e.clientX - el.left) / el.width - 0.5;
    const py = (e.clientY - el.top) / el.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 8);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="ct-wrap">
        <div
          className="ct-scene"
          ref={wrapRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          role="region"
          aria-label="项目作品集"
        >
          <motion.div
            className="ct-deck"
            style={{ rotateX: reduced ? 0 : srx, rotateY: reduced ? 0 : sry }}
          >
            {cards.map((card, i) => (
              <motion.a
                key={card.num}
                className="ct-card"
                href={card.href}
                aria-label={`查看项目：${card.title}`}
                style={{
                  z: reduced ? 0 : [12, 32, 52, 32][i % 4],
                  rotateZ: reduced ? 0 : [-1.6, -0.5, 0.5, 1.6][i % 4],
                }}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
              >
                <div className="ct-shell">
                  <div className="ct-core">
                    <div className="ct-top">
                      <span className="ct-gua" aria-hidden="true">
                        {extractGua(card.cat)}
                      </span>
                      <span className="ct-num" aria-hidden="true">
                        {card.num}
                      </span>
                    </div>
                    {card.preview && (
                      <span className="ct-preview" aria-hidden="true">
                        <img src={card.preview.src} alt="" loading="lazy" decoding="async" />
                        <span className="ct-preview-label">示意画面</span>
                      </span>
                    )}
                    <h3>{card.title}</h3>
                    <span
                      className="ct-cat"
                      dangerouslySetInnerHTML={{ __html: card.cat }}
                    />
                    <p className="ct-desc">{card.desc}</p>
                    <span className="ct-tech">
                      {card.tech.slice(0, 3).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </span>
                    <span className="ct-foot">
                      <span className="ct-ghost">
                        查看详情 <span className="ct-arr">↗</span>
                      </span>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
