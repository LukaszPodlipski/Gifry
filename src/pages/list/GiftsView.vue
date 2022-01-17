<template>
  <div class="gifts-intro">
    <div class="gifts-intro__heading-text">
      <h1 class="heading-text__title">Pomysły na prezenty</h1>
      <h1 class="heading-text__title">
        od <span class="heading-text__name">{{ userName }}</span>
      </h1>

      <p class="heading-text__description">
        Zobacz co przydatnego możesz mi sprezentować. Zarezerwuj wybrany prezent
        i miej pewność, żę będzie on w 100% trafiony!
      </p>

      <div class="gifts-summary">
        <div class="gifts-summary__item">
          <p class="gifts-summary__item__title">Liczba pomysłów</p>
          <p class="gifts-summary__item__count">{{ count }}</p>
        </div>
        <div class="line"></div>
        <div class="gifts-summary__item">
          <p class="gifts-summary__item__title">Najtańszy prezent</p>
          <p class="gifts-summary__item__count">{{ minGiftValue }} zł</p>
        </div>
        <div class="line"></div>
        <div class="gifts-summary__item">
          <p class="gifts-summary__item__title">Najdroższy prezent</p>
          <p class="gifts-summary__item__count">{{ maxGiftValue }} zł</p>
        </div>
        <base-button-small
          @click.native="scrollToOrCopyLink"
          class="gift-summary__button"
          >{{ descriptionButtonCaption }}</base-button-small
        >
      </div>
    </div>
    <base-card class="base-card" place="listPlace">
      <template v-slot:title>
        <h1 class="base-card__title">Lista prezentowa</h1>
      </template>

      <gifts-list
        @min-max-count="setMinMaxCountValues"
        ref="scrollToMe"
      ></gifts-list>
    </base-card>
  </div>
</template>
<script>
import GiftsList from "../../components/list/GiftsList.vue";
import BaseButtonSmall from "../../components/ui/BaseButtonSmall.vue";
export default {
  props: ["id"],
  data() {
    return {
      minGiftValue: 0,
      maxGiftValue: 0,
      count: 0,
      userName: "",
      copied: false,
    };
  },

  components: {
    GiftsList,
    BaseButtonSmall,
  },
  computed: {
    gifts() {
      return this.$store.getters["gifts/gifts"];
    },

    giftsCount() {
      return this.gifts.length;
    },
    isLoggedIn() {
      return !!this.$store.getters.token;
    },
    descriptionButtonCaption() {
      if (this.isLoggedIn && !this.copied) {
        return "Skopiuj link";
      } else if (this.isLoggedIn && this.copied) {
        return "Skopiowano!";
      } else {
        return "Zobacz";
      }
    },
  },

  methods: {
    scrollToOrCopyLink() {
      if (this.isLoggedIn) {
        this.copied = true;
        navigator.clipboard.writeText(location.host + this.$route.fullPath);
        setTimeout(() => {
          this.copied = false;
        }, 500);
      } else {
        const element = this.$refs.scrollToMe.$el;
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },

    setMinMaxCountValues(minMaxCount) {
      this.minGiftValue = minMaxCount.min;
      this.maxGiftValue = minMaxCount.max;
      this.count = minMaxCount.count;
    },

    async loadName() {
      try {
        const userId = this.$route.path.substr(this.$route.path.length - 28);
        await this.$store.dispatch("loadName", userId);
        this.userName = this.$store.getters["userName"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadName();
  },
};
</script>

<style lang="scss" scoped>
.gifts-intro {
  .gifts-intro__heading-text {
    padding: 200px 12vw 0px 12vw;
    color: #fefefe;

    @media only screen and (max-width: 600px) {
      padding: 150px 8vw 0px 8vw;
    }

    .heading-text__title {
      font-size: 3vw;
      @media only screen and (max-width: 1000px) {
        font-size: 2rem;
      }
      .heading-text__name {
        background-size: 400% 400%;
        color: #fefefe;
        letter-spacing: 2px;
        color: #eb6a79;

        background-image: -webkit-linear-gradient(
          45deg,
          #30f5d4 0%,
          #36cbf0 29%,
          #9365ff 66%,
          #ff8e61 100%
        );

        background-image: -moz-linear-gradient(
          45deg,
          #008d76 0%,
          #176f85 29%,
          #5411f2 66%,
          #a0634b 100%
        );

        background-image: linear-gradient(
          45deg,
          #30f5d4 0%,
          #36cbf0 29%,
          #9365ff 66%,
          #ff8e61 100%
        );

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: hue 15s infinite linear;
        background-clip: text;
        animation: hue 15s infinite linear;

        @keyframes hue {
          from {
            -webkit-filter: hue-rotate(0deg);
          }
          to {
            -webkit-filter: hue-rotate(-360deg);
          }
        }

        @-moz-keyframes hue {
          from {
            -webkit-filter: hue-rotate(0deg);
          }
          to {
            -webkit-filter: hue-rotate(-360deg);
          }
        }

        @-webkit-keyframes hue {
          from {
            -webkit-filter: hue-rotate(0deg);
          }
          to {
            -webkit-filter: hue-rotate(-360deg);
          }
        }
      }
    }

    .heading-text__description {
      margin-top: 50px;
      width: 30%;
      line-height: 160%;
      font-size: 1.2rem;
      @media only screen and (max-width: 1250px) {
        width: 100%;
      }
    }

    .gifts-summary {
      background-color: #fefefe;
      width: auto;
      max-width: 800px;
      margin-top: 70px;
      padding: 0.8rem 1rem;
      border-radius: 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      @media only screen and (max-width: 1000px) {
        max-width: 650px;
        margin: 70px auto 0 auto;
        padding: 0.5rem 0.8rem;
        height: 80px;
        width: 100%;
      }
      @media only screen and (max-width: 500px) {
        height: 80px;
        width: 100%;
      }

      .gifts-summary__item {
        width: 24%;
        text-align: center;

        @media only screen and (max-width: 1000px) {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 80%;
        }

        .gifts-summary__item__title {
          width: 100%;
          font-size: 1rem;
          color: #c6c6c6;
          margin: 0;
          @media only screen and (max-width: 1000px) {
            font-size: 0.8rem;
          }
          @media only screen and (max-width: 750px) {
            font-size: 0.6rem;
          }
        }

        .gifts-summary__item__count {
          font-size: 2rem;
          font-weight: bold;
          line-height: 120%;
          color: #202124;
          @media only screen and (max-width: 1000px) {
            font-size: 1.5rem;
          }
          @media only screen and (max-width: 750px) {
            font-size: 1.1rem;
          }
        }
      }

      .line {
        border-left: 2px solid #c6c6c6;
        height: 50px;
        margin: 0 10px;
        width: 0;
        z-index: 3;
      }
      .gift-summary__button {
        min-width: 140px;
        @media only screen and (max-width: 750px) {
          min-width: 100px;
          font-size: 0.8rem;
        }
        @media only screen and (max-width: 550px) {
          display: none;
        }
      }

      .gift-summary__button:active {
        background-color: #3e3e41;
      }
    }
    .base-card {
      margin-top: 10rem;
    }
  }
  .base-card__title {
    @media only screen and (max-width: 1000px) {
      font-size: 2rem;
    }
    @media only screen and (max-width: 550px) {
      border-bottom: 0;
    }
  }
}
</style>
