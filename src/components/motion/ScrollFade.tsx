import React from 'react';
import { MotionConfig, motion } from 'framer-motion';

interface ScrollFadeProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/**
 * ScrollFade — 视口入场动效（fade-up + blur）
 * - whileInView 触发，viewport once + 50px 提前量
 * - 初始 translateY(y) + blur(12px) + opacity 0 → 结束 0
 * - duration 0.8s，easing [0.32, 0.72, 0, 1]
 */
export default function ScrollFade({
  children,
  delay = 0,
  y = 64,
  className = '',
}: ScrollFadeProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '50px' }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
