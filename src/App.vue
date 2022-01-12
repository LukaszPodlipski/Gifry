<template>
  <div id="app" :class="{ 'full-screen': isMainorLoginPage }">
    <the-navigation></the-navigation>
    <the-background
      class="background-image"
      :class="{ 'full-screen': isMainorLoginPage }"
    ></the-background>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TheNavigation from "./components/layout/TheNavigation.vue";
import TheBackground from "./components/layout/TheBackground.vue";
export default {
  name: "App",

  components: {
    TheNavigation,
    TheBackground,
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isMainorLoginPage() {
      if (this.$route.path === "/" || this.$route.path === "/login") {
        return true;
      } else {
        return false;
      }
    },
  },

  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/");
      }
    },
  },

  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background-color: #171717;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  overflow-x: hidden;
}

#app {
  width: 100vw;
}
.full-screen {
  height: 100vh !important;
  overflow: hidden;
}

.background-image {
  width: 100vw;
  height: 80vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  overflow: hidden;
  /* background-size: cover; */
  /* background-position: center -20px; */
  /* padding: 150px 5vw; */
  /* height: 900px; */
  /* background-image: url("./assets/background_image4.jpg"); */
}
.background-image::after {
  box-shadow: inset 0 40px 80px 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
