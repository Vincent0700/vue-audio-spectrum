import Vue from "vue";
import App from "./App.vue";
import AudioSpectrum from "../packages/index";

Vue.use(AudioSpectrum);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
