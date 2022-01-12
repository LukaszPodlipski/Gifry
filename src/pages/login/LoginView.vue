<template>
  <base-card class="base-card">
    <template v-slot:title>
      <h1>Logowanie</h1>
    </template>
    <login-form></login-form>
  </base-card>
</template>

<script>
import LoginForm from "../../components/loginForm/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.base-card {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
