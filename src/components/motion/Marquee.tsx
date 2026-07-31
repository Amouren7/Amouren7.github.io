import React, { useEffect, useRef, useState } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import './motion.css';

type TileVariant = 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 'symbol';

interface MarqueeTile {
  label: string;
  variant: TileVariant;
  /** symbol 变体下渲染的干支/卦符字符，缺省回退 label */
  chars?: string;
  /** 加高 tile（core 高 172px，默认 138px） */
  tall?: boolean;
  /** 加宽 tile（core 高 132px，默认 138px） */
  wide?: boolean;
}

interface MarqueeProps {
  /** 两行 tile；行内请给足数量（Phase 2 负责复制拼接） */
  rows: Array<Array<MarqueeTile>>;
}

/** 微倾斜角度（-1.4° ~ 1.6°），按 index 轮询，保证 SSR/hydration 一致 */
const TILTS = [-1.4, 1, -0.5, 1.6];

function Tile({ tile, index }: { tile: MarqueeTile; index: number }) {
  const tilt = TILTS[index % TILTS.length];
  const cls = [
    'dbz',
    'mq-tile',
    tile.tall ? 'mq-tall' : '',
    tile.wide ? 'mq-wide' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} style={{ transform: `rotate(${tilt}deg)` }}>
      <div className={`core ${tile.variant === 'symbol' ? 'mq-sym' : `mq-${tile.variant}`}`}>
        {tile.variant === 'symbol' ? tile.chars ?? tile.label : tile.label}
      </div>
    </div>
  );
}

/**
 * Marquee — 双行反向滚动图像带（scroll-driven）
 * 位移公式：(scrollY - sectionTop + innerHeight) * 0.3
 * 第一行正向、第二行反向（附加 -36px 起始错位）。
 * tile：.dbz 双层外壳 + .core；默认 216x138，tall 高172、wide 高132；微倾斜。
 * 仅 transform（framer x MotionValue），will-change: transform。
 */
export default function Marquee({ rows }: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const [sectionTop, setSectionTop] = useState(0);
  const [viewportH, setViewportH] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSectionTop(rect.top + window.scrollY);
      setViewportH(window.innerHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const shift = (v: number, sign: 1 | -1) =>
    reduced ? 0 : (v - sectionTop + viewportH) * 0.3 * sign;

  const dir1 = useTransform(scrollY, (v) => shift(v, 1));
  const dir2 = useTransform(scrollY, (v) => shift(v, -1) - 36);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={sectionRef} className="mq">
        {rows.map((tiles, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="mq-row"
            style={{ x: rowIndex === 0 ? dir1 : dir2 }}
          >
            {tiles.map((tile, i) => (
              <Tile key={`${rowIndex}-${i}`} tile={tile} index={i} />
            ))}
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
