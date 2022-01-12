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
        <p class="content__description__price">{{ price }} zł</p>
        <div>
          <base-button-small link :href="url">Zobacz</base-button-small>
          <base-button-small mode="black">Zarezerwuj</base-button-small>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "name", "price", "url", "imgUrl"],

  data() {
    return {
      imgSrcExists: true,
    };
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
  margin: 40px 0 20px 0;
  color: #fefefe;
  width: 100%;

  .gift-list-item__image {
    border-radius: 15px 0px 0 15px;
    height: auto;
    width: 180px;
    object-fit: cover;
    background-color: #fefefe;
  }

  .gift-list-item__content {
    width: 100%;
    padding: 1rem 1rem 0.5rem 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;

    .gift-list-item__content__title {
      font-size: 1.5rem;
      font-weight: 600;
    }

    .gift-list-item__content__description {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .content__description__price {
        font-size: 1.8rem;
        color: #9aa0a6;
      }
    }

    .gift-list-item__content__line {
      width: 100%;
      height: 0;
      border: 1px solid #9aa0a698;
      margin: 1rem 0 1.5rem 0;
    }
  }
}
</style>
