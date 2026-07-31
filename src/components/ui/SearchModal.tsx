import React, { useCallback, useEffect, useRef, useState } from 'react';
import './SearchModal.css';

/**
 * SearchModal — 全站搜索（Pagefind）入口
 * - 萤火绿胶囊「搜索」按钮，固定在右下角
 * - 点击后懒加载 /pagefind/pagefind-ui.css + /pagefind/pagefind-ui.js
 *   （生产构建由 `pagefind --site dist` 生成 /pagefind/pagefind.js 索引，
 *   资源由 public/pagefind/ 静态拷贝；开发环境索引不存在 → 优雅降级提示）
 * - 搜索面板：居中 modal，Double-Bezel 双层 + Paper 底 + 墨字
 */
type Status = 'idle' | 'loading' | 'ready' | 'fallback';

interface PagefindUIOptions {
  element: string;
  bundlePath?: string;
  showSubResults?: boolean;
  showImages?: boolean;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const booted = useRef(false);
  const uiRef = useRef<{ destroy: () => void } | null>(null);

  const boot = useCallback(
    () =>
      new Promise<void>((resolve, reject) => {
        // 1. 注入 Pagefind UI 样式
        if (!document.querySelector('link[href="/pagefind/pagefind-ui.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/pagefind/pagefind-ui.css';
          document.head.appendChild(link);
        }
        // 2. 以「经典脚本」方式加载 pagefind-ui.js（该脚本把 PagefindUI 挂到 window，
        //    不能用动态 import()——经典脚本不会有模块导出）
        const apply = () => {
          const UI = (window as unknown as {
            PagefindUI?: new (opts: PagefindUIOptions) => unknown;
          }).PagefindUI;
          if (!UI) {
            reject(new Error('PagefindUI 全局对象未加载'));
            return;
          }
          uiRef.current = new UI({
            element: '#search-modal',
            bundlePath: '/pagefind/',
            showSubResults: true,
            showImages: false,
          }) as unknown as { destroy: () => void };
          resolve();
        };
        const existing = document.querySelector(
          'script[src="/pagefind/pagefind-ui.js"]'
        );
        if (existing) {
          apply();
          return;
        }
        const script = document.createElement('script');
        script.src = '/pagefind/pagefind-ui.js';
        script.async = true;
        script.onload = apply;
        script.onerror = () => reject(new Error('pagefind-ui.js 加载失败'));
        document.head.appendChild(script);
      }),
    []
  );

  // 打开时启动懒加载（仅一次）
  useEffect(() => {
    if (!open || booted.current || status !== 'idle') return;
    booted.current = true;
    setStatus('loading');
    boot()
      .then(() => setStatus('ready'))
      .catch((err) => {
        console.warn('[Search] Pagefind 索引未构建，显示降级提示。', err);
        setStatus('fallback');
      });
  }, [open, status, boot]);

  // 就绪后聚焦搜索输入框
  useEffect(() => {
    if (!open || status !== 'ready') return;
    const timer = window.setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('#search-modal input');
      input?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [open, status]);

  // ESC 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleTrigger = useCallback(() => setOpen((v) => !v), []);

  return (
    <>
      <button
        type="button"
        className="sm-trigger"
        onClick={handleTrigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="全站搜索"
      >
        <span className="sm-trigger-dot" aria-hidden="true" />
        搜索
      </button>

      <div
        className={`sm-overlay${open ? ' sm-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className="sm-panel"
          role="dialog"
          aria-modal="true"
          aria-label="全站搜索"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sm-core">
            <div className="sm-head">
              <span className="sm-eyebrow">Search · 全站</span>
              <button
                type="button"
                className="sm-close"
                onClick={() => setOpen(false)}
                aria-label="关闭搜索"
              >
                ×
              </button>
            </div>

            {status === 'loading' && (
              <div className="sm-state">
                <span className="sm-spin" aria-hidden="true" />
                <p>正在载入搜索索引…</p>
              </div>
            )}

            {status === 'fallback' && (
              <div className="sm-state">
                <p className="sm-fb-title">搜索索引尚未构建</p>
                <p className="sm-fb-sub">
                  开发环境下 <code>/pagefind/</code> 资源不可用；运行{' '}
                  <code>npm run build</code>（含 pagefind 索引生成）后即可全站搜索。
                </p>
              </div>
            )}

            {/* PagefindUI 挂载点：始终渲染，就绪后由模块接管 */}
            <div id="search-modal" className={`sm-ui${status === 'ready' ? '' : ' sm-ui-idle'}`} />
          </div>
        </div>
      </div>
    </>
  );
}
