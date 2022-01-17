<template>
  <transition name="formToSpinner" mode="out-in">
    <base-spinner v-if="isLoading" class="spinner"></base-spinner>
    <form v-else @submit.prevent="submitForm" class="login-form">
      <label for="name" v-if="isSignup" class="input-label">Imie</label>
      <input
        id="name"
        v-if="isSignup"
        type="text"
        v-model.trim="name.val"
        class="input"
        :class="{ 'input--error': !name.isValid }"
      />
      <label for="email" class="input-label">E-mail</label>
      <input
        id="email"
        type="email"
        v-model.trim="email.val"
        class="input"
        :class="{ 'input--error': !email.isValid }"
      />
      <label for="password" class="input-label">Hasło</label>
      <input
        id="password"
        type="password"
        v-model.trim="password.val"
        class="input"
        :class="{ 'input--error': !password.isValid }"
      />
      <div class="form__buttons">
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
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </transition>
</template>

<script>
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
export default {
  components: { BaseSpinner },
  data() {
    return {
      name: { isValid: true, val: "" },
      email: { isValid: true, val: "" },
      password: { isValid: true, val: "" },
      mode: "login",
      isLoading: false,
      errorMessage: null,
    };
  },

  methods: {
    async submitForm() {
      this.errorMessage = null;
      this.name.isValid = true;
      this.password.isValid = true;
      this.email.isValid = true;

      if (this.mode === "signup" && this.name.val === "") {
        this.errorMessage = "Podaj swoje imię.";
        this.name.isValid = false;
        return;
      }
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.errorMessage = "Podaj prawidłowy adres e-mail.";
        this.email.isValid = false;
        return;
      }
      if (this.password.val.length < 6) {
        this.errorMessage = "Hasło musi posiadać min. 6 znaków.";
        this.password.isValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "login") {
          const actionPayload = {
            email: this.email.val,
            password: this.password.val,
          };

          await this.$store.dispatch("login", actionPayload);
        } else {
          const actionPayload = {
            email: this.email.val,
            password: this.password.val,
            name: this.name.val,
          };

          await this.$store.dispatch("signup", actionPayload);
        }

        this.clearLoginInputs();
        const redirectUrl = "/" + "gift-list" + "/" + this.userId;
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.errorMessage =
          err.message || "Błąd uwierzytelnienia. Spróbuj ponownie później.";
      }

      this.isLoading = false;
    },

    switchAuthMode(e) {
      e.preventDefault();

      this.name.isValid = true;
      this.password.isValid = true;
      this.email.isValid = true;
      this.errorMessage = null;

      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },

    clearLoginInputs() {
      this.name.val = "";
      this.email.val = "";
      this.password.val = "";
    },
  },

  watch: {
    nameValue: function (value) {
      if (value) {
        this.name.isValid = true;
      } else {
        this.name.isValid = false;
      }
    },

    emailValue: function (value) {
      if (value) {
        this.email.isValid = true;
      } else {
        this.email.isValid = false;
      }
    },

    passwordValue: function (value) {
      if (value) {
        this.password.isValid = true;
      } else {
        this.password.isValid = false;
      }
    },
  },

  computed: {
    nameValue() {
      return this.name.val;
    },

    emailValue() {
      return this.email.val;
    },

    passwordValue() {
      return this.password.val;
    },

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
.login-form {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 50%;
  min-width: 350px;
  padding: 2rem 4rem 0rem 4rem;
  border: 2px solid #9aa0a6;
  border-radius: 15px;
  margin-top: 2rem;

  @media only screen and (max-width: 750px) {
    border: none;
    margin-top: 0;
  }

  .input-label {
    font-size: 1.3rem;
    text-align: center;
    color: #9aa0a6;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .input-label:nth-child(1) {
    margin-top: 0rem;
  }

  .input {
    background-color: transparent;
    border: 2px solid #9aa0a6;
    border-radius: 10px;
    font-size: 1rem;
    padding-left: 1rem;
    color: #fefefe;
    height: 40px;

    &:focus {
      border-color: #4d90fe;
    }
    &[type="submit"] {
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

    &[type="submit"]:hover {
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      background: #f8f8f8;
      border: 1px solid #c6c6c6;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
      color: #fefefe;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      box-shadow: 0 0 0 30px rgb(27, 82, 104) inset !important;
      color: #fefefe !important;
    }
  }

  .input--error {
    border: 2px solid #0e7f8e;
  }

  .form__buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 120px;

    .button {
      padding: 1rem;
      min-width: 30%;
      align-self: center;

      @media only screen and (max-width: 550px) {
        font-size: 0.8rem;
      }
      @media only screen and (max-width: 1200px) {
        font-size: 0.7rem;
      }
    }
  }

  .error-message {
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: #0e7f8e;
    padding: 0.5rem 1rem;
    align-self: center;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .spinner {
    align-self: center;
  }
}
.formToSpinner-enter-active,
.formToSpinner-leave-active {
  transition: opacity 0.1s;
}
.formToSpinner-enter, .formToSpinner-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
