import Vue from "vue";
import Vuex from "vuex";
import giftsModule from "./modules/gifts/index";
import authModule from "./modules/auth/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    gifts: giftsModule,
    auth: authModule,
  },
});

export default store;
