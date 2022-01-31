<template>
  <base-card class="reservation-container">
    <template v-slot:title>
      <h1 class="reservation-container__title">Potwierdzenie rezerwacji</h1>
      <base-spinner v-if="isLoading"></base-spinner>
      <div class="reservation-container__gift">
        <img
          :src="imgUrl"
          alt="gift_image"
          class="reservation-container__gift__image"
        />
        <div class="reservation-container__gift__description">
          <p>Nazwa: {{ name }}</p>
          <p>Cena: {{ price }} zł</p>
          <p>Ilość: {{ quantity }}</p>

          <base-button-small
            link
            :href="url"
            class="reservation-container__gift__description__button"
            >Link do prezentu</base-button-small
          >
          <base-button-small
            @click.native="comeBackToList"
            class="reservation-container__gift__description__button"
            >Wróć do listy</base-button-small
          >
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import BaseButtonSmall from "../../components/ui/BaseButtonSmall.vue";
export default {
  components: { BaseButtonSmall },
  data() {
    return {
      name: "",
      price: "",
      url: "",
      imgUrl: "",
      id: "",
      quantity: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async reserveGift() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("gifts/reserveGift", {
          userId: this.userId,
          giftId: this.giftId,
        });
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },

    async loadReservedGift() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("gifts/loadReservedGift", {
          userId: this.userId,
          giftId: this.giftId,
        });
        const reservedGift = this.$store.getters["gifts/reservedGift"];
        this.name = reservedGift.name;
        this.price = reservedGift.price;
        this.url = reservedGift.url;
        this.imgUrl = reservedGift.imgUrl;
        this.id = reservedGift.id;
        this.quantity = reservedGift.quantity;
      } catch (error) {
        this.errorMessage = error.message || "Something went wrong!";
      }
    },
    comeBackToList() {
      this.$router.replace(`/gift-list/${this.userId}`);
    },
  },
  created() {
    const params = this.$route.path.substring(14).split("/");
    this.userId = params[0];
    this.giftId = params[1];
    this.reserveGift();
    this.loadReservedGift();
  },
};
</script>

<style lang="scss" scoped>
.reservation-container {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-height: 900px) {
    margin-top: 15rem;
  }

  .reservation-container__title {
    font-size: 2rem;
    text-align: center;

    @media only screen and (max-width: 900px) {
      font-size: 1.5rem;
    }
    @media only screen and (max-width: 500px) {
      font-size: 1.3rem;
    }
  }

  .reservation-container__gift {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    background-color: #121212;
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 0.7rem;

    @media only screen and (max-width: 650px) {
      flex-direction: column;
    }

    .reservation-container__gift__image {
      width: 150px;
      border-radius: 0.7rem;

      @media only screen and (max-width: 650px) {
        margin-bottom: 1rem;
      }
    }

    .reservation-container__gift__description {
      display: flex;
      padding: 0 1.5rem;
      height: 100%;
      line-height: 180%;
      align-items: flex-start;
      justify-content: start;

      .reservation-container__gift__description__link {
        text-decoration: underline;
      }

      .reservation-container__gift__description__button {
        margin: 1rem 0 0 0;
        width: 100%;
        height: 40px;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
