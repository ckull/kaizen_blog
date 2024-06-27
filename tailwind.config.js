import { config } from './lib/server/config'
import { FONTS_SANS, FONTS_SERIF } from './consts'
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        day: {
          DEFAULT: config.lightBackground || '#ffffff'
        },
        night: {
          DEFAULT: config.darkBackground || '#111827'
        },
        // plain: 'oklch(99.24% 0.008 266)',
      },
      fontFamily: {
        sans: FONTS_SANS,
        serif: FONTS_SERIF,
        noEmoji: [
          // '"PPNeueMontreal"',
          '"IBM Plex Sans"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      }
    }
  },
  variants: {
    extend: {

    }
  },
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
