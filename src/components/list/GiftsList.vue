<template>
  <div class="root">
    <form @submit.prevent="submitSearch" class="input-container">
      <button><img src="../../assets/search_icon.svg" alt="input" /></button>
      <input
        type="text"
        placeholder="Szukaj"
        id="search"
        v-model.trim="searchQuery"
      />
      <img
        src="../../assets/close__icon.svg"
        v-if="!!searchQuery"
        class="clear-icon"
        alt="clear_icon"
        @click="clearSearch"
      />
    </form>
    <base-spinner v-if="!isLoaded"></base-spinner>
    <list-section
      v-if="gifts.length > 0"
      :giftsTo50="giftsTo50"
      :giftsTo100="giftsTo100"
      :giftsTo200="giftsTo200"
      :giftsTo300="giftsTo300"
      :giftsTo500="giftsTo500"
      :giftsTo1000="giftsTo1000"
      :giftsUnder1000="giftsUnder1000"
    ></list-section>
    <div v-else class="no-gifts" @click="goToEditList">
      <p>Dodaj swój pierwszy prezent!</p>
      <base-button-medium>Twoja lista</base-button-medium>
    </div>
  </div>
</template>
<script>
import BaseButtonMedium from "../ui/BaseButtonMedium.vue";
import ListSection from "./ListSection.vue";
export default {
  components: { ListSection, BaseButtonMedium },
  emits: ["min-max-count"],

  data() {
    return {
      giftsTo50: [],
      giftsTo100: [],
      giftsTo200: [],
      giftsTo300: [],
      giftsTo500: [],
      giftsTo1000: [],
      giftsUnder1000: [],
      isLoaded: false,
      searchQuery: "",
      gifts: [],
    };
  },
  computed: {
    filteredGifts() {
      const query = this.searchQuery;
      let newGifts = [];

      if (query) {
        newGifts = this.gifts.filter(item => {
          return query
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
        return newGifts;
      } else {
        return this.gifts;
      }
    },
  },

  methods: {
    submitSearch() {
      this.setGifts(this.filteredGifts);
    },
    setGifts(giftsList) {
      this.giftsTo50 = [];
      this.giftsTo100 = [];
      this.giftsTo200 = [];
      this.giftsTo300 = [];
      this.giftsTo500 = [];
      this.giftsTo1000 = [];
      this.giftsUnder1000 = [];

      giftsList.find(gift => {
        if (gift.price <= 50) {
          this.giftsTo50.push(gift);
        } else if (gift.price <= 100) {
          this.giftsTo100.push(gift);
        } else if (gift.price <= 200) {
          this.giftsTo200.push(gift);
        } else if (gift.price <= 300) {
          this.giftsTo300.push(gift);
        } else if (gift.price <= 500) {
          this.giftsTo500.push(gift);
        } else if (gift.price <= 1000) {
          this.giftsTo1000.push(gift);
        } else if (gift.price > 1000) {
          this.giftsUnder1000.push(gift);
        }
      });

      const giftPriceRanges = [
        this.giftsTo50,
        this.giftsTo100,
        this.giftsTo200,
        this.giftsTo300,
        this.giftsTo500,
        this.giftsTo1000,
        this.giftsUnder1000,
      ];

      for (let i = 0; i < giftPriceRanges.length; i++) {
        giftPriceRanges[i].sort((a, b) => (+a.price > +b.price ? 1 : -1));
      }
      this.isLoaded = true;
    },
    showTrueGifts(gifts) {
      const showTrueGifts = gifts.filter(
        gift => !!gift.show || gift.show === "false"
      );
      return showTrueGifts;
    },

    async loadGifts() {
      this.isLoading = true;
      try {
        const userId = this.$route.path.substr(this.$route.path.length - 28);
        await this.$store.dispatch("gifts/loadGifts", userId);
        this.gifts = this.showTrueGifts(this.$store.getters["gifts/gifts"]);
        this.setGifts(this.gifts);
        const minMaxCount = this.calculateMinMaxCount(this.gifts);
        this.$emit("min-max-count", minMaxCount);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },

    calculateMinMaxCount(gifts) {
      let lowest = Number.POSITIVE_INFINITY;
      let highest = Number.NEGATIVE_INFINITY;
      let tmp;
      if (gifts.length > 0) {
        for (let i = gifts.length - 1; i >= 0; i--) {
          tmp = +gifts[i].price;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
        }
        const minMaxCount = {
          min: lowest,
          max: highest,
          count: gifts.length,
        };
        return minMaxCount;
      } else {
        const minMaxCount = {
          min: 0,
          max: 0,
          count: gifts.length,
        };
        return minMaxCount;
      }
    },
    clearSearch() {
      this.searchQuery = "";
      this.setGifts(this.gifts);
    },
    goToEditList() {
      this.$router.push("/edit-list");
    },
  },
  watch: {
    searchQuery: function (value) {
      if (!value) {
        this.setGifts(this.gifts);
      } else {
        this.setGifts(this.filteredGifts);
      }
    },
  },
  created() {
    this.loadGifts();
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    color: #fefefe;
  }
  .input-container {
    display: flex;
    flex-direction: row;
    height: 50px;
    margin: 50px 0;
    position: relative;
    .clear-icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-160%, -40%);
      cursor: pointer;
    }

    input {
      background-color: transparent;
      border: 1px solid #9aa0a6;
      border-radius: 50px;
      width: 600px;
      height: 50px;
      padding-left: 3rem;
      font-size: 1rem;
      color: #fefefe;
      transform: translate(-1.5rem, 0.1rem);
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
      color: #222;
    }
    button {
      background-color: transparent;
      border: none;
      transform: translate(1.5rem, 0.1rem);
      cursor: pointer;
      z-index: 3;
      img {
        margin: 10px;
        z-index: 3;
      }
    }
  }
  .no-gifts {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #171717;
    padding: 0.5rem 1.5rem;
    border-radius: 10px;
    p {
      color: #fefefe;
      margin-right: 1rem;
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
    button {
      background-color: #981314;
      font-size: 1rem;
      padding: 0.8rem 1.2rem;
      &:hover {
        background-color: #7c0e0e;
      }
    }
  }
}
</style>
