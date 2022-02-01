import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ["./variables.scss"],

  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        background: "#000000",
        primary: {
          base: "#fefefe",
          lighten1: "#c6c6c6",
          lighten2: "#9aa0a6",
        },
        secondary: {
          base: "#121212",
          lighten1: "#202124",
          lighten2: "#35363c",
          lighten3: "#1c1c1c",
          lighten4: "#444749",
          lighten5: "#303134",
        },
        teritary: {
          base: "#0e7f8e",
        },
        quaternary: {
          base: "#c80707",
        },
      },
    },
    dark: true,
  },
});
