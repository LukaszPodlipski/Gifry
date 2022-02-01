<template>
  <base-card class="base-card">
    <template v-slot:title>
      <h1 class="base-card__title">Logowanie</h1>
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

<style lang="scss" scoped>
.base-card {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-height: 900px) {
    margin-top: 15rem;
  }
}
</style>
