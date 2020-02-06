<template>
  <button @click="$emit('click')">{{ label }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  font-size: 20rem;
  font-weight: 400;
  border: 3px solid $COLOR__green;
  background-color: $COLOR__green;
  color: white;
  border-radius: 2px;
  padding: 8rem 12rem;
  transition: all 0.25s ease-in-out;
}

button:hover {
  background-color: $COLOR__white;
  color: $COLOR__green;
}
</style>
