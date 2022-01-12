<template>
  <div :class="place">
    <div class="card">
      <slot name="title"></slot>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    place: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
}
.listPlace {
  margin-top: 10rem;
}
.card {
  width: 65%;
  min-width: 400px;
  background-color: #202124;
  transform: translate(0, -50px);
  border-radius: 20px;
  margin: 0 auto;
  padding: 5rem 0 5rem 0;
  position: relative;
}
h1 {
  color: #fefefe;
  font-size: 3rem;
  margin-bottom: 2rem;
}
</style>
