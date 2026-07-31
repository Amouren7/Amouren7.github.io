import React, { useState } from 'react';
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import './motion.css';

interface NavLink {
  label: string;
  href: string;
}

interface NavPillProps {
  links: Array<{ label: string; href: string }>;
  /** 当前页面对应的链接 label，用于高亮 */
  active?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/**
 * NavPill — 悬浮玻璃 pill 导航
 * - 居中悬浮，品牌（朱砂印章 + A某人）+ 链接 + 萤火绿「联系」
 * - 滚动超过 60px：pill 加深实底（useScroll + useMotionValueEvent → state）
 * - backdrop-blur 仅用于 fixed 导航（合规）
 */
export default function NavPill({ links, active }: NavPillProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 60);
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="np-wrap">
        <motion.nav
          className={`np-pill${scrolled ? ' np-scrolled' : ''}`}
          aria-label="主导航"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <a className="np-brand" href="#top">
            <span className="np-seal" aria-hidden="true">某人</span>
            A某人
          </a>
          <div className="np-links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.label ? 'np-active' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a className="np-cta" href="/about#contact">联系</a>
        </motion.nav>
      </div>
    </MotionConfig>
  );
}
