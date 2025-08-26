import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        robotoSerif: ['var(--font-roboto-serif)', 'serif'],
      },
      backgroundSize: {
        'custom-size': '100% 500px',
      },
      backgroundImage: {
        detailbanner: "url('/assets/detailpage/detail-banner.webp')",
      },
      fontSize: {
        xsm: ['11px', '14px'],
        "title-xxl": ["44px", "55px"],
        "title-xxl2": ["42px", "58px"],
        "title-xl": ["36px", "45px"],
        "title-xl2": ["33px", "45px"],
        "title-lg": ["28px", "35px"],
        "title-md": ["24px", "30px"],
        "title-md2": ["26px", "30px"],
        "title-sm": ["20px", "26px"],
        "title-sm2": ["22px", "28px"],
        "title-xsm": ["18px", "24px"],
        "10": "10px",
        "11": "11px",
        "12": "12px",
        "13": "13px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "17": "17px",
        "18": "18px",
        "19": "19px",
        "20": "20px",
        "21": "21px",
        "22": "22px",
        "23": "23px",
        "24": "24px",
        "25": "25px",
        "26": "26px",
        "27": "27px",
        "28": "28px",
        "29": "29px",
        "30": "30px",
        "31": "31px",
        "32": "32px",
        "33": "33px",
        "34": "34px",
        "35": "35px",
        "36": "36px",
        "37": "37px",

      },
      colors: {
        dashboardDark: "#141414",
        light: "var(--light)",
        btnclr: "var(--btn-clr)",
        table: "var(--table)",
        lightdark: "var(--light-dark)",
        paralight: "var(--para-light)",
        lightgrey: "var(--lightgrey)",
        border: "hsl(var(--border))",
        borderclr: "var(--border-clr)",
        hoverborderclr: "var(--hover-border-clr)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bdrgrey: "var(--bdr-grey)",
        darkgrey: "var(--dark-grey)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        heading: "var(--h1-color)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },


      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      height: {
        '110': '30rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      'xxs': '320px',
      'xsm': '400px',
      'xs': '480px',
      'sm': '640px',
      // 'md': '895px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'xxl': '1921px',
      'xxll': '2560px',
    }
  },
  plugins: [require("tailwindcss-animate"),
  ],

  variants: {
    extend: {
      before: ['content'],
    },
  },
} satisfies Config

export default config