<template>
  <div class="gift-list-item">
    <img v-if="imgSrcExists" :src="imgUrl" class="gift-list-item__image" />
    <img
      v-else
      src="../../assets/default_gift_image.svg"
      class="gift-list-item__image"
      alt="giftimage"
    />
    <div class="gift-list-item__content">
      <h3 class="gift-list-item__content__title">{{ name }}</h3>
      <div class="gift-list-item__content__line"></div>
      <div class="gift-list-item__content__description">
        <p class="content__description__price">
          {{ quantity }}{{ quantityDescriptionType }}{{ price }} zł
        </p>
        <div class="gift-list-item__content__description_buttons">
          <base-button-small
            link
            :href="url"
            class="gift-list-item__content__button"
            >Zobacz</base-button-small
          >
          <base-button-small
            mode="black"
            class="gift-list-item__content__button"
            >Zarezerwuj</base-button-small
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "name", "price", "url", "imgUrl", "quantity"],

  data() {
    return {
      imgSrcExists: true,
    };
  },

  computed: {
    quantityDescriptionType() {
      if (this.quantity === 1) {
        return " szt za ";
      } else {
        return " szt po ";
      }
    },
  },

  methods: {
    checkIfImageExists(url, callback) {
      const img = new Image();
      img.src = url;

      if (img.complete) {
        callback(true);
      } else {
        img.onload = () => {
          callback(true);
        };

        img.onerror = () => {
          callback(false);
        };
      }
    },
  },

  created() {
    this.checkIfImageExists(this.imgUrl, exists => {
      if (exists) {
        this.imgSrcExists = true;
      } else {
        this.imgSrcExists = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.gift-list-item {
  display: flex;
  flex-direction: row;
  background-color: #303134;
  border-radius: 15px;
  margin: 20px 0 20px 0;
  color: #fefefe;
  width: 100%;
  min-width: 300px;

  .gift-list-item__image {
    border-radius: 15px 0px 0 15px;
    height: auto;
    width: 180px;
    object-fit: cover;
    background-color: #fefefe;
    @media only screen and (max-width: 1300px) {
      width: 140px;
    }

    @media only screen and (max-width: 900px) {
      width: 100px;
    }
  }

  .gift-list-item__content {
    width: 100%;
    padding: 1rem 2rem 1rem 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;

    @media only screen and (max-width: 900px) {
      padding: 1rem 1rem 0.5rem 1rem;
    }

    .gift-list-item__content__title {
      font-size: 1.5rem;
      letter-spacing: 1px;
      font-weight: 400;

      @media only screen and (max-width: 900px) {
        font-size: 1rem;
      }
    }

    .gift-list-item__content__description {
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: space-between;

      @media only screen and (max-width: 900px) {
        flex-direction: column;
      }

      .content__description__price {
        font-size: 1.8rem;
        color: #9aa0a6;

        @media only screen and (max-width: 900px) {
          font-size: 1.5rem;
          align-self: flex-start;
          margin-left: 5%;
          margin-bottom: 5px;
        }
        @media only screen and (max-width: 1300px) {
          font-size: 1.4rem;
        }
      }
      .gift-list-item__content__description_buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 1rem;
        @media only screen and (max-width: 1100px) {
          flex-direction: column;
          margin-top: 0.5rem;
        }

        .gift-list-item__content__button {
          width: 48%;
          align-self: center;
          margin: 0;
          @media only screen and (max-width: 900px) {
            font-size: 0.6rem;
            margin: 0.2rem;
          }
          @media only screen and (max-width: 1100px) {
            width: 100%;
          }
          @media only screen and (max-width: 1300px) {
            font-size: 0.9rem;
            margin: 0.2rem;
          }
          @media only screen and (max-width: 900px) {
            font-size: 0.8rem;
            margin: 0.2rem;
          }
        }
      }
    }

    .gift-list-item__content__line {
      width: 100%;
      height: 0;
      border: 1px solid #9aa0a698;
      margin: 1rem 0 1.5rem 0;
      @media only screen and (max-width: 900px) {
        margin: 0.8rem 0 0.8rem 0;
      }
    }
  }
}
</style>
