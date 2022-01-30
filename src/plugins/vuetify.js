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
      },
    },
    dark: true,
  },
});
