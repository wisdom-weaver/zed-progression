const _ = require("lodash");
const colors = require("tailwindcss/colors");
const cmap = require("./src/utils/cmap.json");
const theme_colors = require("./src/static/json/theme_colors.json");
const { fontFamily } = require("tailwindcss/defaultTheme");

const hcolors = _.chain(cmap).keyBy("cid").mapValues("hex").value();

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      ...colors,
      c0: "#404142",
      c1: "#563d6d",
      c2: "#5e3846",
      c3: "#66513e",
      c4: "#375b55",
      c5: "#326373",
      c6: "#F24202",
      c7: "#27b18a",
      c77: "#27b18a",
      c99: "#64748B",
      c1000: "#27B18A",
      dk: "#0F111A",
      pk: "#292D3E",

      ...hcolors,

      dark: "#111111",
      reg: "#212121",
      lig: "#2F2F2F",
      acc_pu: "#7F07B9",
      acc_db: "#21374A",
      acc_gr: "#2EAC68",
    },
    screens: {
      xs: "0px",
      sm: "350px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      ...fontFamily,
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  safelist: ["bg-flex", "px-4", /^text-/],
  plugins: [require("@tailwindcss/typography")],
};
