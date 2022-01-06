<template>
  <base-card class="base-card">
    <h1>Logowanie</h1>
    <form @submit.prevent="submitForm">
      <label for="name" v-if="isSignup">Imie</label>
      <input id="name" v-if="isSignup" type="text" v-model.trim="name" />
      <label for="email">E-mail</label>
      <input id="email" type="email" v-model.trim="email" />
      <label for="password">Hasło</label>
      <input id="password" type="password" v-model.trim="password" />
      <div class="buttons">
        <base-button-small class="button" mode="bold">{{
          submitButtonCaption
        }}</base-button-small>
        <base-button-small
          mode="flat"
          @click.native="switchAuthMode"
          class="button"
          >{{ switchModeButtonCaption }}</base-button-small
        >
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      // const actionPayload = {
      //   email: this.email,
      //   password: this.password,
      // };

      try {
        if (this.mode === "login") {
          const actionPayload = {
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("login", actionPayload);
        } else {
          const actionPayload = {
            email: this.email,
            password: this.password,
            name: this.name,
          };
          await this.$store.dispatch("signup", actionPayload);
        }
        // const redirectUrl = '/' + (this.$route.query.redirect || 'edit-list');
        const redirectUrl = "/" + "gift-list" + "/" + this.userId;
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error =
          err.message || "Błąd uwierzytelnienia. Spróbuj ponownie później.";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
  computed: {
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "lub zarejestruj ";
      } else {
        return "lub zaloguj";
      }
    },
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Zaloguj";
      } else {
        return "Zarejestruj";
      }
    },
    userId() {
      return this.$store.getters.userId;
    },
    isSignup() {
      if (this.mode === "signup") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.base-card {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #fefefe;
    font-size: 3rem;
    margin-bottom: 4rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 50%;
    min-width: 350px;
    padding: 2rem 4rem 0rem 4rem;
    border: 2px solid #9aa0a6;
    border-radius: 15px;
    label {
      font-size: 1.3rem;
      text-align: center;
      color: #9aa0a6;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    label:nth-child(1) {
      margin-top: 0rem;
    }
    input {
      background-color: transparent;
      border: 2px solid #9aa0a6;
      border-radius: 10px;
      font-size: 1rem;
      padding-left: 1rem;
      color: #fefefe;
      height: 40px;
    }
    input:hover {
      border-color: #a0a0a0 #b9b9b9 #b9b9b9 #b9b9b9;
    }
    input:focus {
      border-color: #4d90fe;
    }

    input[type="submit"] {
      border-radius: 2px;
      background: #f2f2f2;
      border: 1px solid #f2f2f2;
      color: #757575;
      font-size: 14px;
      font-weight: bold;
      width: 100px;
      padding: 0 16px;
      height: 36px;
    }
    input[type="submit"]:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      background: #f8f8f8;
      border: 1px solid #c6c6c6;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      color: #fefefe;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      box-shadow: 0 0 0 30px rgb(104, 27, 27) inset !important;
      color: #fefefe !important;
    }
    .buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 120px;
      .button {
        padding: 0.8rem;
        min-width: 30%;
        align-self: center;
      }
    }
    .error {
      text-align: center;
      color: red;
      margin-bottom: 1rem;
    }
  }
}
</style>
