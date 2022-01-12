<template>
  <div class="main-page">
    <div class="main-page__box">
      <div class="main-page__heading-text">
        <div>
          <h1 class="heading-text__title">Ślub, urodziny</h1>
          <h1 class="heading-text__title">a może inna okazja?</h1>
        </div>

        <div class="heading-text__description">
          <p>
            Twórz, edytuj i udostepniaj swoją<span
              class="heading-text__description_justification"
            >
              wymarzoną listę prezentową!</span
            >
          </p>
        </div>
        <base-button-medium class="heading-text__button" go to="/login">{{
          gotoListCaption
        }}</base-button-medium>
      </div>
      <social-cards class="social-cards"></social-cards>
    </div>
  </div>
</template>
<script>
import socialCards from "../../components/socialCard/socialCards.vue";
export default {
  components: {
    socialCards,
  },
  computed: {
    gotoListCaption() {
      if (this.isLoggedIn) {
        return "Edytuj swoją listę!";
      } else {
        return "Zaloguj się aby utworzyć listę!";
      }
    },
    isLoggedIn() {
      return !!this.$store.getters.token;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: "Poppins";

  .main-page__box {
    padding: 2rem 4rem;
    color: white;
    border-radius: 15px;
    position: relative;
    z-index: 1;
    background: inherit;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 65vh;
    width: 85vw;

    .main-page__heading-text {
      margin-top: 2rem;
      width: 50%;

      .heading-text__title {
        font-size: 4rem;
        font-weight: 400;
        line-height: 150%;
        color: #fefefe;

        &:nth-child(2) {
          color: #d3d2ff;
        }
      }

      .heading-text__description {
        margin-top: 2rem;
        width: 80%;
        line-height: 200%;
        font-size: 2rem;
        letter-spacing: 1px;
        color: #fefefe8a;
        border-radius: 15px;

        .heading-text__description_justification {
          color: rgba(254, 254, 254, 0.726);
        }
      }
      .heading-text__button {
        margin: 3rem 0 0 0;
        padding: 1rem 2rem;
        background-color: #fefefe1c;
        min-width: 40%;
        transition: 0.5s;
        &:hover {
          background-color: #1717176b;
        }
      }
    }

    .social-cards {
      transform: translateX(100px);
    }
  }
}
</style>
