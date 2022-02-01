<template>
  <div class="gifts-list">
    <form @submit.prevent="submitSearch" class="search-input-container">
      <button class="search-input__submit-icon">
        <img
          src="../../assets/search_icon.svg"
          alt="input"
          class="search-input__submit-icon_image"
        />
      </button>
      <input
        type="text"
        placeholder="Szukaj"
        id="search"
        v-model.trim="searchQuery"
        class="search-input"
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
    <div v-else class="gift-list__no-gifts-info" @click="goToEditList">
      <p class="no-gifts-info__text">Dodaj swój pierwszy prezent!</p>
      <base-button-medium class="no-gifts-info__button"
        >Twoja lista</base-button-medium
      >
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
.gifts-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-input-container {
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

    .search-input {
      background-color: transparent;
      border: 2px solid var(--v-secondary-lighten2);
      border-radius: 50px;
      width: 600px;
      height: 50px;
      padding-left: 3rem;
      font-size: 1rem;
      color: var(--v-primary-base);
      transform: translate(-1.5rem, 0.1rem);

      &:hover {
        border-color: var(--v-teritary-base);
      }

      &:focus {
        border-color: var(--v-teritary-base);
      }

      &[type="submit"] {
        border-radius: 2px;
        background: var(--v-primary-base);
        border: 1px solid var(--v-primary-base);
        color: var(--v-secondary-lighten1);
        font-size: 14px;
        font-weight: bold;
        width: 100px;
        padding: 0 16px;
        height: 36px;
      }

      &[type="submit"]:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background: #f8f8f8;
        border: 1px solid var(--v-primary-lighten1);
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        color: var(--v-secondary-base);
      }

      @media only screen and (max-width: 1000px) {
        width: 100%;
      }
    }

    .search-input__submit-icon {
      background-color: transparent;
      border: none;
      transform: translate(1.5rem, 0.1rem);
      cursor: pointer;
      z-index: 3;

      .search-input__submit-icon_image {
        margin: 10px;
        z-index: 3;
      }
    }
  }

  .gift-list__no-gifts-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--v-secondary-base);
    padding: 0.5rem 1.5rem;
    border-radius: 10px;

    .no-gifts-info__text {
      color: var(--v-primary-base);
      margin-right: 1rem;
      font-size: 1.2rem;
      letter-spacing: 1px;
    }

    .no-gifts-info__button {
      background-color: var(--v-teritary-base);
      font-size: 1rem;
      padding: 0.8rem 1.2rem;

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}

.base-card__title {
  @media only screen and (max-width: 1000px) {
    font-size: 2rem;
  }
}
</style>
