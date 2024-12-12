module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        zoom: 'zoom 10s ease-in-out infinite',
      },
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      '.rounded-b-half': {
        clipPath: 'ellipse(65% 100% at 50% 0%)',
      },
    })
  },
  ],
}