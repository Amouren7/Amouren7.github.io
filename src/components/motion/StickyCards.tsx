import React, { useEffect, useRef, useState } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
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
  images: { a: string; b: string; c: string };
  href?: string;
}

interface StickyCardsProps {
  cards: ProjectCard[];
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/** 移动端检测：≤700px 时禁用 sticky 叠层，卡改为普通流式堆叠 */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return mobile;
}

function Card({ card, index, total, isMobile }: { card: ProjectCard; index: number; total: number; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : targetScale]);

  // 渐变占位图变体（按卡序轮换 p1a..p3c）
  const g = `p${(index % 3) + 1}`;

  return (
    <div
      ref={ref}
      className={`sc-card${isMobile ? ' sc-mobile' : ''}`}
      style={{ top: '6rem', zIndex: total - index }}
    >
      <motion.div
        className="sc-inner"
        style={{ scale: isMobile ? 1 : scale, y: isMobile ? 0 : index * 28 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="dbz sc-dbz">
          <div className="core sc-core">
            {card.href && (
              <a
                className="sc-coverlink"
                href={card.href}
                aria-label={`查看项目：${card.title}`}
              />
            )}
            <div className="sc-top">
              <span className="sc-num" aria-hidden="true">
                {card.num}
              </span>
              <div className="sc-info">
                <div className="sc-cat" dangerouslySetInnerHTML={{ __html: card.cat }} />
                <h4>{card.title}</h4>
              </div>
              <span className="sc-ghost" aria-hidden="true">
                项目详情
                <span className="sc-arr">↗</span>
              </span>
            </div>

            <p className="sc-desc">{card.desc}</p>

            <div className="sc-tech">
              {card.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="sc-metrics">
              {card.metrics.map((m) => (
                <div className="sc-metric" key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>

            <div className="sc-imgs">
              <div className="sc-col">
                <div className={`ph h1 tilt-l ${g}a`}>{card.images.a}</div>
                <div className={`ph h2 tilt-r ${g}b`}>{card.images.b}</div>
              </div>
              <div className={`ph h3 ${g}c`}>{card.images.c}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * StickyCards — 项目 sticky 叠卡（缩放层叠）
 * - 每卡容器 sticky top-24 / h-[85vh]；卡偏移 translateY(index*28px)
 * - useScroll + useTransform：targetScale = 1 - (total-1-index)*0.03
 * - 卡：.dbz 外壳 + 白芯；编号 hover 萤火绿点亮
 * - 内容：分类/标题 + 简介 + 技术栈 chips + 关键成果 metrics + 双列占位图
 * - 移动端（≤700px）：取消 sticky 与缩放，普通流式堆叠
 */
export default function StickyCards({ cards }: StickyCardsProps) {
  const isMobile = useIsMobile();
  return (
    <MotionConfig reducedMotion="user">
      <div className="sc-wrap">
        {cards.map((card, i) => (
          <Card key={card.num} card={card} index={i} total={cards.length} isMobile={isMobile} />
        ))}
      </div>
    </MotionConfig>
  );
}
