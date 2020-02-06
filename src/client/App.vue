<template>
  <div id="app">
    <HelloWorld msg="Vue NodeJS Websockets" />
    <p data-testid="connection-status">
      Connected to server: {{ connectedMessage }}
    </p>
    <p data-testid="stock">There are {{ stock }} products remaining</p>
    <button v-bind:disabled="!canOrder" @click="addToBasket">
      Add to basket
    </button>
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HelloWorld from "./components/HelloWorld.vue";

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
    connectedMessage() {
      return this.$store.state.socketConnected;
    },
    canOrder() {
      return this.stock > 0 && this.$store.state.socketConnected;
    },
    ...mapState("products", {
      stock: state => state.stock
    })
  },
  methods: {
    ...mapActions({
      addToBasket: "products/orderProduct"
    })
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
