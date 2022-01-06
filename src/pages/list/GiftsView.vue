<template>
  <div>
    <div class="heading-text">
      <h1>Pomysły na prezenty</h1>
      <h2>
        od <span>{{ userName }}</span>
      </h2>
      <p>
        Zobacz co przydatnego możesz mi sprezentować. Zarezerwuj wybrany prezent
        i miej pewność, żę będzie on w 100% trafiony!
      </p>
      <div class="gift-summary">
        <div>
          <p>Liczba pomysłów</p>
          <p>{{ count }}</p>
        </div>
        <div class="line"></div>
        <div>
          <p>Najtańszy prezent</p>
          <p>{{ minGiftValue }} zł</p>
        </div>
        <div class="line"></div>
        <div>
          <p>Najdroższy prezent</p>
          <p>{{ maxGiftValue }} zł</p>
        </div>
        <base-button-small @click.native="scrollToElement"
          >Zobacz</base-button-small
        >
      </div>
    </div>
    <base-card class="base-card" place="listPlace">
      <template v-slot:title> <h1>Lista prezentowa</h1> </template>

      <gifts-list @min-max-count="setMinMaxCountValues" ref="scrollToMe">
      </gifts-list>
    </base-card>
  </div>
</template>
<script>
import GiftsList from "../../components/list/GiftsList.vue";
export default {
  props: ["id"],
  data() {
    return {
      minGiftValue: 0,
      maxGiftValue: 0,
      count: 0,
      userName: "",
    };
  },

  components: {
    GiftsList,
  },
  computed: {
    gifts() {
      return this.$store.getters["gifts/gifts"];
    },

    giftsCount() {
      return this.gifts.length;
    },
  },

  methods: {
    scrollToElement() {
      const element = this.$refs.scrollToMe.$el;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
.heading-text {
  padding: 200px 180px 0px 180px;
  color: white;
  h1 {
    font-size: 3.5rem;
  }
  h2 {
    font-size: 3.5rem;
    span {
      color: #eb6a79;
    }
  }
  p {
    margin-top: 50px;
    width: 30%;
    line-height: 160%;
    font-size: 1.2rem;
  }
  .gift-summary {
    background-color: #fefefe;
    width: 700px;
    margin-top: 70px;
    padding: 0.8rem 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      width: 24%;
      text-align: center;
      p {
        width: 100%;
        font-size: 1rem;
        color: #c6c6c6;
        margin: 0;
      }
      p:nth-child(2) {
        font-size: 2rem;
        font-weight: bold;
        line-height: 120%;
        color: #202124;
      }
    }
    .line {
      border-left: 1px solid #c6c6c6;
      height: 50px;
      margin: 0 10px;
      width: 0;
      z-index: 3;
    }
  }
  .base-card {
    margin-top: 10rem;
  }
}
</style>
