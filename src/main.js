import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./vuetify";
import BaseButtonSmall from "./components/ui/BaseButtonSmall.vue";
import BaseButtonMedium from "./components/ui/BaseButtonMedium.vue";
import BaseButtonLarge from "./components/ui/BaseButtonLarge.vue";

import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseCard from "./components/ui/BaseCard.vue";

Vue.config.productionTip = false;
Vue.component("base-button-small", BaseButtonSmall);
Vue.component("base-button-medium", BaseButtonMedium);
Vue.component("base-button-large", BaseButtonLarge);

Vue.component("base-spinner", BaseSpinner);
Vue.component("base-card", BaseCard);

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  vuetify,
}).$mount("#app");
