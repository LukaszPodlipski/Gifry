<template>
  <div class="gift-item">
    <img :src="imgUrl" alt="" class="gift-img" />
    <div class="description">
      <p class="title">{{ name }}</p>
      <div class="line"></div>
      <p class="price">{{ price }} zł</p>
    </div>
    <div class="controls-group">
      <div class="controls">
        <img
          class="control-display-icon"
          src="../../assets/unshow_icon.svg"
          alt=""
          @click="controlShowOfGift"
          v-if="giftHasShowTrue"
        />
        <img
          class="control-display-icon"
          src="../../assets/show_icon.svg"
          alt=""
          @click="controlShowOfGift"
          v-else
        />
        <img
          class="delete-icon"
          src="../../assets/delete_icon.svg"
          alt=""
          @click="deleteGiftEmmit"
        />
      </div>
      <base-button-small class="open-gift-url-btn" link :href="url"
        >Zobacz</base-button-small
      >
    </div>
  </div>
</template>

<script>
import BaseButtonSmall from "../ui/BaseButtonSmall.vue";
export default {
  components: { BaseButtonSmall },
  props: ["id", "name", "price", "url", "imgUrl", "show"],
  data() {
    return {
      giftHasShow: this.show,
    };
  },
  computed: {
    giftHasShowTrue() {
      if (this.giftHasShow || this.giftHasShow === "true") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async controlShowOfGift() {
      try {
        this.$store.dispatch("gifts/changeShowOfGift", {
          show: !this.giftHasShow,
          giftId: this.id,
        });
        this.giftHasShow = !this.giftHasShow;
      } catch (error) {
        //
      }
    },
    deleteGiftEmmit() {
      this.$emit("delete-gift", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.gift-item {
  display: grid;
  grid-template-columns: 0.7fr 3fr 0.4fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image description controls";
  gap: 0px 0px;
  min-height: 150px;
  width: 100%;
  border-radius: 15px;
  margin: 1rem 0;
  .gift-img {
    grid-area: image;
    height: 150px;
    max-width: 150px;
    align-self: start;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    object-fit: cover;
    background-color: #fefefe;
  }
  .description {
    grid-area: description;
    margin: 0 2rem 0 2rem;
    display: flex;
    flex-direction: column;
    justify-self: start;
    .title {
      font-size: 1.5rem;
      color: #fefefe;
    }
    .line {
      border-top: 2px solid #9aa0a6;
      margin: 1rem 0;
    }
    .price {
      font-size: 1.5rem;
      color: #9aa0a6;
    }
  }
  .controls-group {
    grid-area: controls;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    .controls {
      display: flex;
      justify-content: space-between;
      width: 100%;
      img {
        object-fit: cover;
        margin: 0.5rem;
        cursor: pointer;
        height: 40px;
        &:hover {
          filter: brightness(90%);
        }
      }
    }
    .open-gift-url-btn {
      font-size: 1rem;
      padding: 0.8rem 1rem;
      margin: 0.5rem;
      width: 90%;
      &:hover {
        filter: brightness(90%);
      }
    }
  }
}
</style>
