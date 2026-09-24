import React, { useRef } from 'react';
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
 * 位移绑定到区块自身的滚动进度，避免初次测量后布局变化造成偏移漂移。
 * 第一行正向、第二行反向（附加 -36px 起始错位）。
 * tile：.dbz 双层外壳 + .core；默认 216x138，tall 高172、wide 高132；微倾斜。
 * 仅 transform（framer x MotionValue），will-change: transform。
 */
export default function Marquee({ rows }: MarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const dir1 = useTransform(scrollYProgress, (v) => (reduced ? 0 : v * 260));
  const dir2 = useTransform(scrollYProgress, (v) => (reduced ? 0 : -36 - v * 260));

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
