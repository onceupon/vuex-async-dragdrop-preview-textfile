// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Buefy from "buefy";
import "buefy/lib/buefy.css";
import Vuex from "vuex";
// Global CSS
import "./styles/index.scss";

Vue.use(Buefy);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
