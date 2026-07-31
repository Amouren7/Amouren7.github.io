import React, { useCallback, useRef } from 'react';
import { MotionConfig, animate, motion, useMotionValue } from 'framer-motion';
import './motion.css';

interface MagneticButtonProps {
  label: string;
  href?: string;
  className?: string;
}

const EASE_OUT: [number, number, number, number] = [0.32, 0.72, 0, 1];

/**
 * MagneticButton — 磁吸 CTA 按钮
 * - 鼠标靠近时按钮跟随位移（strength≈5px，触发边界 = 按钮外扩 80px）
 * - 悬停：内箭头 translate(3px,-3px) scale(1.06)
 * - 按下：整体 scale(.97)
 * - 过渡：跟随 0.3s ease-out / 归位 0.6s 自定义 cubic-bezier(.32,.72,0,1)
 * - 仅 transform / opacity，不阻塞布局
 */
export default function MagneticButton({
  label,
  href = '#',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const returnToCenter = useCallback(() => {
    animate(x, 0, { type: 'tween', duration: 0.6, ease: EASE_OUT });
    animate(y, 0, { type: 'tween', duration: 0.6, ease: EASE_OUT });
  }, [x, y]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const nx = relX / (rect.width / 2 + 80);
      const ny = relY / (rect.height / 2 + 80);
      if (Math.abs(nx) > 1 || Math.abs(ny) > 1) {
        // 已离开磁吸范围 → 缓动归位
        if (x.get() !== 0 || y.get() !== 0) returnToCenter();
        return;
      }
      // strength ≈ 5
      animate(x, nx * 5, { type: 'tween', duration: 0.3, ease: 'easeOut' });
      animate(y, ny * 5, { type: 'tween', duration: 0.3, ease: 'easeOut' });
    },
    [x, y, returnToCenter],
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.a
        ref={ref}
        href={href}
        className={`cta-btn ${className}`.trim()}
        onMouseMove={handleMouseMove}
        onMouseLeave={returnToCenter}
        style={{ x, y }}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
      >
        <span className="cta-btn-label">{label}</span>
        <motion.span
          className="cta-btn-arrow"
          aria-hidden="true"
          variants={{
            rest: { x: 0, y: 0, scale: 1 },
            hover: { x: 3, y: -3, scale: 1.06 },
          }}
          transition={{ type: 'tween', duration: 0.7, ease: EASE_OUT }}
        >
          ↗
        </motion.span>
      </motion.a>
    </MotionConfig>
  );
}
