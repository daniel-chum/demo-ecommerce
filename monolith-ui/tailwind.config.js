module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'rubik': ["'Rubik', sans-serif"],
        'oswald': ["'Oswald', sans-serif"],
        'chicle': ["'Chicle', cursive"],
      },
      height: {
        '60vh': '60vh',
        '80vh': '80vh',
      },
      fontSize: {
        'sm': '.825rem'
      },
      letterSpacing: {
        'tighest': '-.09em'
      },
      colors: {
        primary: "var(--primary)",
        "primary-bright": "var(--primary-bright)",
        secondary: "var(--secondary)",
        "secondary-bright": "var(--secondary-bright)",
        "call-to-action": "var(--call-to-action)",
        'background': "var(--background)",
        'background-2': "var(--background-2)",
        'font-gray': "var(--font-gray)"
      },
      screens: {
        '3xl': '1600px'
      },
      boxShadow: {
        "outline-normal": "0 0 0 2px var(--accents-1)",
        magical:
          "rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px",
      },
    },
  },
  variants: {
    extend: {
      overflow: ['hover'],
    },
  },
  plugins: [],

};
