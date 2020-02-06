<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>Connected to server: {{ connectedMessage }}</p>
    <p>There are {{ inStock }} products remaining</p>
    <button v-bind:disabled="!canOrder" @click="addToBasket">
      Add to basket
    </button>
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

let socket;

export default {
  name: "app",
  data() {
    return {
      connected: false,
      inStock: 0,
      error: false,
      errorMessage: ""
    };
  },
  computed: {
    canOrder: function() {
      return this.inStock && this.connected;
    },
    connectedMessage: function() {
      return this.connected ? "yes" : "no";
    }
  },
  created() {
    this.setupSocket();
  },
  destroyed() {
    this.connected = false;
    socket.close();
  },
  methods: {
    addToBasket() {
      if (this.connected) {
        socket.send(JSON.stringify({ type: "order_product" }));
      }
    },
    setupSocket() {
      const vm = this;
      socket = new WebSocket("ws://localhost:8999");
      socket.onopen = function() {
        vm.connected = true;
        socket.send(
          JSON.stringify({ type: "welcome", value: "hello from vue" })
        );
      };
      socket.onmessage = function(event) {
        const { type, value } = JSON.parse(event.data);
        console.log(type, value);
        switch (type) {
          case "stock_update":
            vm.error = false;
            vm.inStock = value;
            break;
          default:
            vm.error = true;
            vm.errorMessage = value;
        }
      };
    }
  },
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
