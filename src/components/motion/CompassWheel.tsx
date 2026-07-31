import React from 'react';
import { MotionConfig, motion } from 'framer-motion';
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

/**
 * CompassWheel — 天干地支罗盘（品牌核心组件）
 * - 320px 圆盘：十二地支边缘均匀排布 + 八卦淡金 + 双虚线反向缓转环（46s/30s）
 * - 中心墨色圆核显示**太极（阴阳）**符号 —— 通用玄学意象，不含个人生辰信息
 * - 中心萤火绿光晕呼吸动画（opacity/scale 循环）
 * - 移动端 scale(.68)
 */
export default function CompassWheel() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="wheel" style={{ width: W, height: W }}>
        <div className="cw-ring-static" aria-hidden="true" />
        <motion.div
          className="cw-ring-rot"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="cw-ring-rot2"
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        {BRANCHES.map((b, i) => {
          const { x, y } = polar(C, C, BRANCH_R, i * 30);
          return (
            <span key={b} className="cw-zb" style={{ left: x, top: y }}>
              {b}
            </span>
          );
        })}
        {GUA.map((g, i) => {
          const { x, y } = polar(C, C, GUA_R, 22.5 + i * 45);
          return (
            <span key={g} className="cw-gua" style={{ left: x, top: y }}>
              {g}
            </span>
          );
        })}
        <motion.div
          className="cw-glow"
          aria-hidden="true"
          animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.18, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
        />
        <div className="cw-core">
          <div className="cw-tj" aria-hidden="true">
            <div className="taiji" />
            <small>太极</small>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
