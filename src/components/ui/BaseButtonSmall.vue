<template>
  <button v-if="!link && !go" :class="mode">
    <slot></slot>
  </button>
  <a v-else-if="link && !go" :href="href" :class="mode" target="_blank">
    <slot></slot>
  </a>
  <router-link v-else-if="go" :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    size: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    go: {
      type: Boolean,
      required: false,
      default: false,
    },
    href: {
      type: String,
      required: false,
      default: "/",
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>

<style scoped>
button,
a {
  margin: 5px 10px;
  text-decoration: none;
  text-align: center;
  padding: 0.9rem 1.4rem;
  font: inherit;
  background-color: #202124;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;
}
a:hover,
a:active,
button:hover,
button:active {
  background-color: #262729;
  border-color: #262729;
}
.bold {
  background-color: #171717;
  border: none;
}
.flat {
  border: 1px solid #9aa0a6;
}
</style>
