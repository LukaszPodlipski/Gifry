<template>
  <div class="edit-list__gift-item">
    <img :src="imgUrl" alt="" class="edit-list__gift-item__image" />
    <div class="edit-list__description">
      <p class="edit-list__description__title">{{ name }}</p>
      <div class="edit-list__description__line"></div>
      <p class="edit-list__description__price">{{ price }} zł</p>
    </div>
    <div class="edit-list__controls">
      <div class="edit-list__controls__buttons">
        <img
          class="edit-list__controls__buttons_icon"
          src="../../assets/unshow_icon.svg"
          alt=""
          @click="controlShowOfGift"
          v-if="giftHasShowTrue"
        />
        <img
          class="edit-list__controls__buttons_icon"
          src="../../assets/show_icon.svg"
          alt=""
          @click="controlShowOfGift"
          v-else
        />
        <img
          class="edit-list__controls__buttons_icon"
          src="../../assets/delete_icon.svg"
          alt=""
          @click="deleteGiftEmit"
        />
      </div>
      <base-button-small
        class="edit-list__controls__view-button"
        link
        :href="url"
        >Zobacz</base-button-small
      >
      <base-button-small class="edit-list__controls__edit-button"
        >Edytuj</base-button-small
      >
    </div>
  </div>
</template>

<script>
import BaseButtonSmall from "../ui/BaseButtonSmall.vue";
export default {
  components: { BaseButtonSmall },
  props: ["id", "name", "price", "url", "imgUrl", "show"],
  emits: ["delete-gift"],

  data() {
    return {
      giftHasShow: this.show,
      errorMessage: "Error",
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
        this.errorMessage = error.message || "Błąd podczas usuwania prezentu.";
      }
    },

    deleteGiftEmit() {
      this.$emit("delete-gift", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-list__gift-item {
  display: grid;
  grid-template-columns: 0.7fr 3fr 0.4fr;
  grid-template-rows: 1fr;
  grid-template-areas: "image description controls";
  gap: 0px 0px;
  min-height: 150px;
  width: 100%;
  border-radius: 15px;
  margin: 1rem 0;

  .edit-list__gift-item__image {
    grid-area: image;
    height: 200px;
    width: 200px;
    align-self: start;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    object-fit: cover;
    background-color: #fefefe;
  }
  .edit-list__description {
    grid-area: description;
    margin: 0 2rem 0 2rem;
    display: flex;
    flex-direction: column;
    justify-self: flex-start;

    .edit-list__description__title {
      font-size: 1.5rem;
      color: #fefefe;
    }

    .edit-list__description__line {
      border-top: 2px solid #9aa0a6;
      margin: 1rem 0;
    }

    .edit-list__description__price {
      font-size: 1.5rem;
      color: #9aa0a6;
    }
  }

  .edit-list__controls {
    grid-area: controls;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.7rem;
    background-color: #1c1c1c;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    height: 100%;

    .edit-list__controls__buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .edit-list__controls__buttons_icon {
        object-fit: cover;
        margin: 0.5rem;
        cursor: pointer;
        height: 40px;

        &:hover {
          filter: brightness(90%);
        }
      }
    }

    .edit-list__controls__view-button {
      font-size: 0.8rem;
      padding: 0.8rem 1rem;
      margin: 0.5rem;
      width: 90%;

      &:hover {
        filter: brightness(90%);
      }
    }

    .edit-list__controls__edit-button {
      color: #fefefe;
      margin: 0.5rem;
      font-size: 0.8rem;
      padding: 0.8rem 1rem;
      margin: 0.5rem;
      width: 90%;

      &:hover {
        filter: brightness(90%);
      }
    }

    .error-message {
      position: absolute;
    }
  }
}
</style>
