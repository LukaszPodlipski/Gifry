<template>
  <div class="navigation">
    <img
      src="../../assets/logo_gifty.svg"
      alt="logo"
      class="logo"
      @click="logoClick"
    />
    <div>
      <base-button-small go :to="editListLink" v-if="isLoggedIn">{{
        listButtonCaption
      }}</base-button-small>
      <base-button-small
        v-if="!isLoginPage"
        go
        :to="loginLink"
        :class="{ flat: !isLoggedIn }"
        @click.native="logout"
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
      } else {
        const redirectUrl = "/" + "gift-list" + "/" + this.userId;
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
  align-items: center;
  justify-content: space-between;
  .logo {
    height: 100%;
    cursor: pointer;
  }
}
.flat {
  background-color: transparent;
  border: 1px solid #fefefe;
  color: #fefefe;
  padding: 0.8rem 1.4rem;
  &:hover {
    border: 1px solid #fefefe;
    background-color: #fefefe25;
  }
}
</style>
