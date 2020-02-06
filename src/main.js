import Vue from "vue";
import Vuex from "vuex";
import store from "./client/store/index.js";
import App from "./client/App.vue";

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
