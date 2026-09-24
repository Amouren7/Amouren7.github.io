import React from 'react';
import { MotionConfig, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import './motion.css';

/** 十二地支（顺时针，子起于正上方） */
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
/** 八卦符号（淡金，与地支错峰 22.5°） */
const GUA = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];

const W = 320;
const C = W / 2;
const BRANCH_R = 150;
const GUA_R = 118;

/** 顺时针角度（0° 为正上方）→ 绝对坐标 */
function polar(cx: number, cy: number, radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + radius * Math.sin(rad),
    y: cy - radius * Math.cos(rad),
  };
}

/** 鼠标倾斜弹簧（软、带回弹） */
const SPRING = { stiffness: 150, damping: 20, mass: 0.7 };

/**
 * CompassWheel — 天干地支罗盘（品牌核心组件）· 3D 版
 * - 320px 圆盘：正面朝向（能看到全貌），perspective 900px + preserve-3d
 * - 三层 Z 深度：地支环 translateZ(46px) / 八卦环 translateZ(32px) / 虚线环(34/20px) / 太极核心最高 translateZ(52px)
 * - 双虚线反向缓转（46s/30s，仅 rotateZ，符合只 transform）
 * - 鼠标移动：整盘 rotateX/rotateY 弹簧视差（离开回正）
 * - 中心墨色圆核显示**太极（阴阳）**符号 —— 通用玄学意象，不含个人生辰信息
 * - 移动端 scale(.68)，无鼠标不触发倾斜
 */
export default function CompassWheel() {
  const reduced = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING);
  const sry = useSpring(ry, SPRING);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || reduced) return;
    const el = e.currentTarget.getBoundingClientRect();
    if (!el.width || !el.height) return;
    const px = (e.clientX - el.left) / el.width - 0.5;
    const py = (e.clientY - el.top) / el.height - 0.5;
    ry.set(px * 18);
    rx.set(-py * 12);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="wheel" style={{ width: W, height: W }}>
        <motion.div
          className="wheel-tilt"
          style={{ rotateX: reduced ? 0 : srx, rotateY: reduced ? 0 : sry, transformStyle: 'preserve-3d' }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div className="cw-z" style={{ transform: 'translateZ(18px)' }}>
            <div className="cw-ring-static" aria-hidden="true" />
          </div>
          <div className="cw-z" style={{ transform: 'translateZ(34px)' }}>
            <motion.div
              className="cw-ring-rot"
              aria-hidden="true"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div className="cw-z" style={{ transform: 'translateZ(20px)' }}>
            <motion.div
              className="cw-ring-rot2"
              aria-hidden="true"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          {BRANCHES.map((b, i) => {
            const { x, y } = polar(C, C, BRANCH_R, i * 30);
            return (
              <span
                key={b}
                className="cw-zb"
                style={{ left: x, top: y, transform: `translate(-50%,-50%) translateZ(46px)` }}
              >
                {b}
              </span>
            );
          })}
          {GUA.map((g, i) => {
            const { x, y } = polar(C, C, GUA_R, 22.5 + i * 45);
            return (
              <span
                key={g}
                className="cw-gua"
                style={{ left: x, top: y, transform: `translate(-50%,-50%) translateZ(32px)` }}
              >
                {g}
              </span>
            );
          })}
          <div className="cw-z" style={{ transform: 'translateZ(10px)' }}>
            <motion.div
              className="cw-glow"
              aria-hidden="true"
              animate={reduced ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [1, 1.18, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
            />
          </div>
          <div className="cw-core" style={{ transform: 'translate(-50%,-50%) translateZ(52px)' }}>
            <div className="cw-tj" aria-hidden="true">
              <div className="taiji" />
              <small>太极</small>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
