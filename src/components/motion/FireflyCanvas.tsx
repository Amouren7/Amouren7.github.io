import React, { useEffect, useRef } from 'react';
import './motion.css';

/**
 * FireflyCanvas — 萤火粒子场（canvas 3D 透视投影）
 * - 140 颗萤火绿粒子在 Z 轴纵深飘动：近大远小、越近越亮（bokeh 景深）
 * - tone="night"：墨夜版（粒子更强更亮、12% 大光斑、有机游移，背景深萤绿）
 * - tone="paper"：纸面版（60 颗低透明光点，呼应 Hero 纸面氛围，浅色底）
 * - 只用 canvas 绘制，不动 DOM 布局；prefers-reduced-motion 时停动画
 * - 组件自持 rAF，卸载自动清理
 */
export default function FireflyCanvas({ tone = 'night' }: { tone?: 'night' | 'paper' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0,
      H = 0,
      raf = 0;

    function resize() {
      W = cv.offsetWidth;
      H = cv.offsetHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const isNight = tone === 'night';
    const N = isNight ? 140 : 60;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const big = isNight && Math.random() < 0.12;
      pts.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 260 + 20,
        r: big ? Math.random() * 5 + 4 : Math.random() * 2.2 + 0.7,
        big,
        ph: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.012 + 0.003,
        mx: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.1,
        vy: -(Math.random() * (isNight ? 0.14 : 0.22) + (isNight ? 0.06 : 0.12)),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (isNight) ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.ph += p.sp;
        // 有机游移 + 上升
        p.x += Math.sin(p.ph * 1.7) * p.mx * 0.05 + p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = 104; p.x = Math.random() * 100; }
        if (p.x < -4) p.x = 104;
        if (p.x > 104) p.x = -4;

        const persp = Math.min(1.6, Math.max(0.55, 320 / (p.z + 220)));
        const sx = (p.x / 100) * W;
        const sy = (p.y / 100) * H;
        const rad = p.r * persp * (1 + p.z / 260) * 1.4;
        const tw = 0.55 + 0.45 * Math.sin(p.ph * 3);

        let alpha: number;
        if (isNight) {
          alpha = (p.big ? 0.3 : 0.18) + persp * tw * (p.big ? 0.9 : 0.75);
        } else {
          alpha = 0.14 + persp * tw * 0.28;
        }
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, rad * 2.6);
        grd.addColorStop(0, `rgba(255,255,220,${alpha})`);
        grd.addColorStop(0.18, `rgba(188,240,27,${alpha * 0.8})`);
        grd.addColorStop(1, 'rgba(188,240,27,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(sx, sy, rad * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      if (!reduced) raf = requestAnimationFrame(draw);
    }
    if (!reduced) {
      draw();
    } else {
      draw(); // 画一帧静态，不再循环
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [tone]);

  return <canvas ref={ref} className="ffc" aria-hidden="true" />;
}
