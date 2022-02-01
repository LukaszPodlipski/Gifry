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
      <social-cards-small
        class="social-cards social-cards-small"
        ref="cards"
      ></social-cards-small>
      <social-cards-medium
        class="social-cards social-cards-medium"
        ref="cards"
      ></social-cards-medium>
      <social-cards-large
        class="social-cards social-cards-large"
        ref="cards"
      ></social-cards-large>
    </div>
  </div>
</template>
<script>
import socialCardsSmall from "../../components/socialCard/socialCardsSmall.vue";
import socialCardsMedium from "../../components/socialCard/socialCardsMedium.vue";
import socialCardsLarge from "../../components/socialCard/socialCardsLarge.vue";

export default {
  components: {
    socialCardsSmall,
    socialCardsMedium,
    socialCardsLarge,
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
    color: var(--v-primary-base);
    border-radius: 15px;
    position: relative;
    z-index: 1;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65vh;
    width: 85vw;

    @media only screen and (max-width: 930px) {
      justify-content: center;
    }

    @media only screen and (max-width: 1160px) {
      padding: 2rem 2rem;
    }

    .main-page__heading-text {
      margin-top: 2rem;
      width: 50%;

      @media only screen and (max-width: 930px) {
        width: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .heading-text__title {
        font-size: 4rem;
        font-weight: 400;
        line-height: 150%;
        color: var(--v-primary-base);

        @media only screen and (max-width: 500px) {
          font-size: 1.5rem;
          text-align: center;
        }

        @media only screen and(min-width: 501px) and (max-width: 930px) {
          font-size: 3rem;
          text-align: center;
        }

        @media only screen and (max-width: 1920px) {
          font-size: 3.5vw;
        }

        &:nth-child(2) {
          color: #d3d2ff;
        }
      }

      .heading-text__description {
        margin-top: 2rem;
        width: 80%;
        line-height: 200%;
        font-size: 1.5vw;
        letter-spacing: 1px;
        color: #fefefe8a;
        border-radius: 15px;
        display: flex;

        @media only screen and (max-width: 930px) {
          font-size: 1rem;
          text-align: center;
          margin: 2rem auto;
        }

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
        @media only screen and (max-width: 1350px) {
          font-size: 0.9rem;
        }
        @media only screen and (max-width: 1030px) {
          font-size: 0.8rem;
        }
      }
    }

    .social-cards {
      transform: translateX(100px);
    }

    .social-cards-small {
      @media only screen and (max-width: 929px) {
        display: none;
      }

      @media only screen and (min-width: 930px) and (max-width: 1159px) {
        display: flex;
      }

      @media only screen and (min-width: 1160px) {
        display: none;
      }
    }

    .social-cards-medium {
      display: none;

      @media only screen and (min-width: 1160px) and (max-width: 1559px) {
        display: flex;
      }
    }

    .social-cards-large {
      display: none;

      @media only screen and (min-width: 1560px) {
        display: flex;
      }
    }
  }
}
</style>
