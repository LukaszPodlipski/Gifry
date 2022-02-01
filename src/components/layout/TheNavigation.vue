<template>
  <div class="navigation">
    <img
      src="../../assets/mygifty_logo.svg"
      alt="logo"
      class="navigation__logo"
      @click="logoClick"
    />
    <div class="navigation__buttons">
      <base-button-small
        go
        :to="editListLink"
        v-if="isLoggedIn"
        class="navigation__buttons__button"
        >{{ listButtonCaption }}</base-button-small
      >
      <base-button-small
        v-if="!isLoginPage"
        go
        :to="loginLink"
        :class="{ flat: !isLoggedIn }"
        @click.native="logout"
        class="navigation__buttons__button"
        >{{ loginCaption }}</base-button-small
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttonStyle: "",
    };
  },
  computed: {
    loginCaption() {
      if (this.isLoggedIn) {
        return "Wyloguj";
      } else {
        return "Zaloguj";
      }
    },
    isLoggedIn() {
      return !!this.$store.getters.token;
    },
    loginLink() {
      if (!this.userId) {
        return "/login";
      } else {
        return "/";
      }
    },
    isEdditing() {
      if (this.$route.path === "/edit-list") return true;
      else return false;
    },
    editListLink() {
      if (!this.isEdditing) return "/edit-list";
      else return "/gift-list/" + this.userId;
    },
    listButtonCaption() {
      if (!this.isEdditing) return "Edytuj listę";
      else return "Wróć do listy";
    },
    isLoginPage() {
      if (this.$route.path === "/login" && !this.isLoggedIn) {
        return true;
      } else {
        return false;
      }
    },
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    logoClick() {
      if (this.$route.path.includes("gift-list")) {
        return;
      } else if (this.userId) {
        const redirectUrl = "/" + "gift-list" + "/" + this.userId;
        this.$router.replace(redirectUrl);
      } else {
        const redirectUrl = "/";
        this.$router.replace(redirectUrl);
      }
    },
    logout() {
      if (this.isLoggedIn) {
        this.$store.dispatch("logout");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  position: absolute;
  top: 0;
  display: flex;
  z-index: 1;
  height: 150px;
  width: 100%;
  padding: 40px 3vw;
  align-items: flex-start;
  justify-content: space-between;

  @media only screen and (max-width: 1000px) {
    padding: 30px 20px;
  }

  .navigation__logo {
    height: 100%;
    cursor: pointer;
    @media only screen and (max-width: 1000px) {
      height: 40px;
    }
  }

  .navigation__buttons {
    display: flex;
    flex-direction: row;

    .navigation__buttons__button {
      @media only screen and (max-width: 550px) {
        font-size: 0.7rem;
        padding: 0.8rem;
      }
    }
  }
}

.flat {
  background-color: transparent;
  border: 1px solid var(--v-primary-base);
  color: var(--v-primary-base);
  padding: 0.8rem 1.4rem;
  transition: 0.5s;

  &:hover {
    border: 1px solid var(--v-primary-base);
    background-color: var(--v-primary-base) 25;
  }
}
</style>
