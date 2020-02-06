import { MESSAGE_TYPES } from "../../../server/messageHandlers/messageTypes.js";

// initial state
const state = {
  stock: 0
};

// getters
const getters = {};

// actions
const actions = {
  socketReceived({ commit }, message) {
    if (message.type === MESSAGE_TYPES.STOCK_UPDATE) {
      commit("setStock", message.value);
    }
  },
  orderProduct({ commit }) {
    // this is done for the websocket plugin to pick up on it
    // I don't know Vue well enough to know a better way
    commit("socketSend", { type: MESSAGE_TYPES.PRODUCT_ORDER });
  }
};

// mutations
const mutations = {
  // socketSend is just a noop to not throw
  socketSend() {},
  setStock(state, stock) {
    state.stock = stock;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
