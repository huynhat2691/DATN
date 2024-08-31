/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      BaiJamjuree: ["Bai Jamjuree", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1100px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, variants }) {
      const newUtilities = {
        ".line-clamp-1": {
          display: "-webkit-box",
          "-webkit-line-clamp": "1",
          "-webkit-box-orient": "vertical",
        },
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
        },
        ".line-clamp-3": {
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
        },
        ".nav-link-hover": {
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            width: "0",
            height: "2px",
            bottom: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            "background-color": theme("colors.green.500"),
            transition: "width 0.3s ease",
          },
          "&:hover::after": {
            width: "70%",
          },
        },
      };
      addUtilities(
        newUtilities,
        ["responsive", "hover"],
        variants("navLinkHover")
      );
    },
  ],
};
