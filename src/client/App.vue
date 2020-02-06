<template>
  <div id="app">
    <div class="productCard">
      <img class="productCard__image" src="./assets/products/bril.jpg" />
      <p class="productCard__title">
        Steven S.
        <span class="productCard__stock" data-testid="stock"
          >(only {{ stock }} left)</span
        >
      </p>
      <p class="productCard__price">€ 29,00</p>
      <Button
        v-bind:disabled="!canOrder"
        @click="addToBasket"
        label="Add to basket"
      />
    </div>
    <p v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Button from "./components/Button.vue";

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
    Button
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
