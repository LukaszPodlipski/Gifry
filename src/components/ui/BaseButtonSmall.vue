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

<style lang="scss" scoped>
button,
a {
  margin: 5px 10px;
  text-decoration: none;
  text-align: center;
  padding: 0.9rem 1.4rem;
  font: inherit;
  background-color: var(--v-secondary-lighten1);
  border: none;
  color: var(--v-primary-base);
  cursor: pointer;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--v-secondary-lighten1);
  border-color: var(--v-secondary-lighten1);
  opacity: 0.8;
}
.black {
  background-color: var(--v-secondary-base);
  border: 2px solid var(--v-secondary-base);

  &:hover {
    opacity: 0.8;
  }
}

.flat {
  border-radius: 15px;
  border: 2px solid var(--v-primary-lighten2);
}

.flat:hover {
  background-color: var(--v-secondary-base);

  border: 2px solid var(--v-secondary-base);
}
</style>
