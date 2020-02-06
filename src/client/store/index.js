import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products.js";
import socket from "../utils/webSocket.js";
import createWebsocketPlugin from "./plugins/websocketPlugin.js";

const websocketPugin = createWebsocketPlugin(socket);

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    socketConnected: false
  },
  actions: {
    socketConnected({ commit }) {
      commit("setConnected");
    }
  },
  mutations: {
    setConnected(state) {
      state.socketConnected = true;
    }
  },
  modules: {
    products
  },
  strict: debug,
  plugins: [websocketPugin]
});
