<template>
  <v-app id="app" :class="{ 'full-screen': isMainorLoginPage }">
    <the-navigation></the-navigation>
    <the-background
      class="background-image"
      :class="{ 'full-screen': isMainorLoginPage }"
    ></the-background>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap");

.primary {
  color: var(--v-primary-base);
}

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
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#app {
  width: 100vw;
}

.v-application {
  background-color: var(--v-background) !important;
}

.v-application ul,
.v-application ol {
  padding: 0 !important;
  margin: 0 !important;
}

.v-application a {
  color: var(--v-primary-base) !important;
}

.v-application p {
  margin-bottom: 0 !important;
}

.v-application .background {
  background-color: var(--v-secondary-base) !important;
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
  -webkit-box-shadow: inset 0px -39px 37px -21px rgba(23, 23, 23, 1);
  -moz-box-shadow: inset 0px -39px 37px -21px rgba(23, 23, 23, 1);
  box-shadow: inset 0px -39px 37px -21px rgba(23, 23, 23, 1);
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
