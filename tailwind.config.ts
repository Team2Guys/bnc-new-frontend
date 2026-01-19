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
        futura: ['var(--font-futura)', 'sans-serif'], 
      },
      backgroundSize: {
        'custom-size': '100% 500px',
      },
      backgroundImage: {
        detailbanner: "url('/assets/detailpage/detail-banner.webp')",
      },
      fontSize: {  
        "title-md": ["24px", "30px"],
        "title-md2": ["26px", "30px"],
        "12": "12px",
        "15": "15px",
        "16": "16px",
        "18": "18px",
        "19": "19px",
        "20": "20px",
        "22": "22px",
        "24": "24px",
        "28": "28px",
        "30": "30px",
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
        input: "hsl(var(--input))",
        foreground: "hsl(var(--foreground))",
        bdrgrey: "var(--bdr-grey)",
        darkgrey: "var(--dark-grey)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
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
      'xss': '350px',
      'xsm': '400px',
      'xs': '480px',
      'sm': '640px',
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