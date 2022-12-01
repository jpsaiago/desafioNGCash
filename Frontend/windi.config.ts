import { defineConfig } from "windicss/helpers";
import * as form from "windicss/plugin/forms";
import ScrollPlugin from "@windicss/plugin-scrollbar";

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      boxShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "bold-sm": "1px 2px 0 1px black",
        "bold-md": "2px 3px 0 2px black",
      },
    },
  },
  plugins: [ScrollPlugin, form],
});
