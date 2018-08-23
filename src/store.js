import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    filecontent: "Preview Content",
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    updateState(state, payload) {
      state.filecontent = "";
      state.filecontent = payload;
    }
  }
});
