import React, { useRef } from 'react';
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import './motion.css';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}

/** 单个字符：隐形占位撑宽 + 绝对定位动画层，按滚动进度 opacity 0.2 → 1 */
function Char({ char, progress, range, reduced }: CharProps) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0.2, 1]);
  return (
    <span className="at-char">
      <span className="at-char-ph">{char}</span>
      <motion.span className="at-char-ani" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

/**
 * AnimatedText — 逐字浮现（关于段落）
 * - useScroll 绑定段落，offset ['start 0.8', 'end 0.2']
 * - 每个字符按全局进度区间 [i/N, (i+1)/N] 从 opacity 0.2 → 1
 * - prefers-reduced-motion 下全部恒为 1
 */
export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const lines = text.split('\n');
  const total = lines.reduce((n, line) => n + Array.from(line).length, 0);

  let cursor = 0;

  return (
    <MotionConfig reducedMotion="user">
      <p ref={ref} className={`at ${className}`.trim()}>
        {total === 0
          ? text
          : lines.map((line, li) => (
              <span key={li} className="at-line">
                {Array.from(line).map((ch, ci) => {
                  const start = cursor / total;
                  const end = (cursor + 1) / total;
                  cursor += 1;
                  return (
                    <Char
                      key={ci}
                      char={ch}
                      progress={scrollYProgress}
                      range={[start, end]}
                      reduced={reduced}
                    />
                  );
                })}
              </span>
            ))}
      </p>
    </MotionConfig>
  );
}
