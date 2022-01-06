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
        />
        <img class="delete-icon" src="../../assets/delete_icon.svg" alt="" />
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
  props: ["id", "name", "price", "url", "imgUrl"],
};
</script>

<style lang="scss" scoped>
.gift-item {
  display: grid;
  grid-template-columns: 0.8fr 2fr 0.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image description controls";
  gap: 0px 0px;
  height: 150px;
  width: 100%;
  .gift-img {
    grid-area: image;
    height: inherit;
  }
  .description {
    grid-area: description;
    margin: 2rem;
    .title {
      font-size: 1.5rem;
      color: #fefefe;
    }
    .line {
      border-top: 1px solid #9aa0a6;
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
    .controls {
      img {
        margin: 0.3rem;
        cursor: pointer;
        &:hover {
          filter: brightness(90%);
        }
      }
    }
    .open-gift-url-btn {
      font-size: 0.8rem;
      padding: 0.6rem 1rem;
      &:hover {
        filter: brightness(90%);
      }
    }
  }
}
</style>
