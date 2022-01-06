<template>
  <div id="app">
    <navigation></navigation>
    <header></header>
    <transition name="fade" mode="out-in">
      <router-view> </router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  created() {
    this.$store.dispatch("tryLogin");
    console.log(process.env.APP_TEST);
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
}

#app {
  width: 100vw;
}

header {
  height: 850px;
  background-image: url("./assets/background_image4.jpg");
  background-size: cover;
  background-position: center -20px;
  padding: 150px 5vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
