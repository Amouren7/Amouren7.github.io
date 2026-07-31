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
 * CardTheater — 项目 3D 卡片剧场（替换 sticky 叠卡）
 * - 卡片排成 3D 扇面：每张在不同 translateZ + rotateY 微旋，perspective 透视
 * - 鼠标在扇面上移动：整副 rotateX/rotateY 弹簧视差
 * - 悬停拈起：单卡向观众 translateZ 前移 + 转正 + 放大（CSS transition）
 * - 整卡可点击 → /projects/[slug] 详情页（求职作品集功能保留）
 * - 入场：每卡 opacity + y 错峰浮现（whileInView，符合只 transform/opacity）
 * - 移动端（≤700px）：垂直堆叠，无 3D
 */
export default function CardTheater({ cards }: CardTheaterProps) {
  const reduced = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.8 });
  const sry = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.8 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - el.left) / el.width - 0.5;
    const py = (e.clientY - el.top) / el.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 10);
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
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          aria-label="项目作品集"
        >
          <motion.div
            className="ct-deck"
            style={{ rotateX: reduced ? 0 : srx, rotateY: reduced ? 0 : sry }}
          >
            {cards.map((card, i) => (
              <motion.a
                key={card.num}
                className={`ct-card c${i + 1}`}
                href={card.href}
                aria-label={`查看项目：${card.title}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
              >
                <span className="ct-shell">
                  <span className="ct-core">
                    <span className="ct-gua" aria-hidden="true">
                      {extractGua(card.cat)}
                    </span>
                    <span className="ct-num" aria-hidden="true">
                      {card.num}
                    </span>
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
                  </span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
