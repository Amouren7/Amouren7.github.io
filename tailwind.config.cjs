/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4F0E5',
        card: '#FFFFFF',
        ink: {
          DEFAULT: '#1B1912',
          soft: 'rgba(27,25,18,0.6)',
        },
        firefly: {
          DEFAULT: '#BCF01B',
          deep: '#8FBF0B',
        },
        night: {
          DEFAULT: '#14120C',
          text: '#E7E0CF',
        },
        verm: '#C0392B',
      },
      fontFamily: {
        kanit: ['Kanit', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        serifsc: ['"Noto Serif SC"', 'serif'],
        sanssc: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        bezel: '20px',
        core: '15px',
      },
      boxShadow: {
        bezel: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -28px rgba(0,0,0,0.85)',
        'firefly-glow': '0 16px 40px -12px rgba(188,240,27,0.85)',
      },
    },
  },
  plugins: [],
};
