<template>
  <div class="edit-list__gift-item">
    <img
      v-if="imgSrcExists"
      :src="imgUrl"
      alt=""
      class="edit-list__gift-item__image"
      :class="{ 'edit-list__gift-item__image--edit-active': isEditing }"
    />
    <img
      v-else
      src="../../assets/default_gift_image.svg"
      alt=""
      class="edit-list__gift-item__image"
    />

    <div class="edit-list__description">
      <p class="edit-list__description__title">{{ name }}</p>
      <div class="edit-list__description__line"></div>
      <p class="edit-list__description__price">
        {{ quantity }}{{ quantityDescriptionType }}{{ price }} zł
      </p>
      <p v-if="isReserved" class="edit-list__description__reserved">
        Zarezerwowano
      </p>
    </div>
    <div
      :class="{ 'edit-list__controls--edit-active': isEditing }"
      class="edit-list__controls"
    >
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
      <base-button-small
        class="edit-list__controls__edit-button"
        :class="{ 'edit-list__controls__edit-button--edit-active': isEditing }"
        @click.native="setEditingToTrue"
        >Edytuj</base-button-small
      >
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-if="isEditing && !isLoading" class="edit-list__gift-item__edit-box">
      <label for="name" class="edit-list__gift-item__edit-box__label"
        >Nazwa</label
      >
      <input
        type="text"
        id="name"
        v-model="giftName.val"
        class="edit-list__gift-item__edit-box__input"
      />
      <label for="price" class="edit-list__gift-item__edit-box__label"
        >Cena</label
      >
      <input
        type="text"
        id="price"
        v-model="giftPrice.val"
        class="edit-list__gift-item__edit-box__input"
      />
      <label for="quantity" class="edit-list__gift-item__edit-box__label"
        >Ilość</label
      >
      <input
        type="text"
        id="quantity"
        v-model="giftQuantity.val"
        class="edit-list__gift-item__edit-box__input"
      />
      <label for="url" class="edit-list__gift-item__edit-box__label"
        >Link do prezentu</label
      >
      <input
        type="url"
        id="url"
        v-model="giftUrl.val"
        class="edit-list__gift-item__edit-box__input"
      />
      <label for="imgUrl" class="edit-list__gift-item__edit-box__label"
        >Link do zdjęcia</label
      >
      <input
        type="url"
        id="imgUrl"
        v-model="giftImgUrl.val"
        class="edit-list__gift-item__edit-box__input"
      />
      <label for="reserved" class="edit-list__gift-item__edit-box__label"
        >Prezent zarezerwowany</label
      >
      <input
        type="checkbox"
        id="reserved"
        v-model="giftIsReserved"
        class="edit-list__gift-item__edit-box__checkbox"
      />

      <p class="edit-list__gift-item__edit-box__error-message">
        {{ errorMessage }}
      </p>

      <base-button-small
        class="edit-list__gift-item__edit-box__submit-button"
        @click.native="updateGiftValues"
        >Zapisz</base-button-small
      >
    </div>
  </div>
</template>

<script>
import BaseButtonSmall from "../ui/BaseButtonSmall.vue";
import BaseSpinner from "../ui/BaseSpinner.vue";
export default {
  components: { BaseButtonSmall, BaseSpinner },
  props: [
    "id",
    "name",
    "price",
    "url",
    "imgUrl",
    "show",
    "quantity",
    "isReserved",
  ],

  emits: ["delete-gift", "update-gifts"],

  data() {
    return {
      giftHasShow: this.show,
      errorMessage: "",
      imgSrcExists: true,
      isEditing: false,
      formIsValid: true,
      giftId: null,
      isLoading: false,

      giftName: {
        val: "",
        isValid: true,
      },
      giftPrice: {
        val: null,
        isValid: true,
      },
      giftUrl: {
        val: "",
        isValid: true,
      },
      giftImgUrl: {
        val: "",
        isValid: true,
      },
      giftQuantity: {
        val: null,
        isValid: true,
      },
      giftIsReserved: null,
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
    quantityDescriptionType() {
      if (this.quantity === 1) {
        return " szt za ";
      } else {
        return " szt po ";
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

    async updateGiftValues() {
      try {
        this.validateNewGiftValues();

        if (!this.formIsValid) {
          return;
        }
        this.isLoading = true;

        const giftData = {
          name: this.giftName.val,
          price: this.giftPrice.val,
          url: this.giftUrl.val,
          imgUrl: this.giftImgUrl.val,
          quantity: this.giftQuantity.val,
          giftId: this.giftId,
          isReserved: this.giftIsReserved,
        };
        this.isLoading = false;

        this.$store.dispatch("gifts/patchGift", giftData);
        this.isEditing = false;

        setTimeout(() => {
          this.$emit("update-gifts");
        }, 500);
      } catch (error) {
        this.errorEditGiftMessage =
          error.message || "Błąd podczas edycji prezentu.";
      }
    },

    deleteGiftEmit() {
      this.$emit("delete-gift", this.id);
    },
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
    setEditingToTrue() {
      this.isEditing = !this.isEditing;
    },

    validateNewGiftValues() {
      this.errorSaveGiftMessage = "";
      this.formIsValid = true;

      if (this.giftName.val === "" || this.giftName.val.length > 60) {
        this.giftName.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj nazwę prezentu (max 60 znaków)";
      }

      if (!this.giftPrice.val || this.giftPrice.val < 0) {
        this.giftPrice.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj cenę - pamiętaj, aby była większa od 0.";
      }

      if (this.giftUrl.val === "") {
        this.giftUrl.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj prawidłowy adres do prezentu.";
      }

      if (this.giftImgUrl.val === "") {
        this.giftImgUrl.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj prawidłowy adres do zdjęcia prezentu.";
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

    this.giftId = this.id;
    this.giftName.val = this.name;
    this.giftPrice.val = this.price;
    this.giftUrl.val = this.url;
    this.giftImgUrl.val = this.imgUrl;
    this.giftQuantity.val = this.quantity;
    this.giftIsReserved = this.isReserved;
  },
};
</script>

<style lang="scss" scoped>
.edit-list__gift-item {
  display: grid;
  grid-template-columns: 0.7fr 3fr 0.4fr;
  grid-template-rows: 2fr;
  grid-template-areas:
    "image description controls"
    "editBox editBox editBox";
  gap: 0px 0px;
  min-height: 150px;
  width: 100%;
  border-radius: 15px;
  margin: 1.5rem 0;

  @media only screen and (max-width: 1400px) {
    grid-template-columns: 0.7fr 3fr;
    grid-template-rows: 3fr;
    grid-template-areas:
      "image description"
      "controls controls"
      "editBox editBox";
  }

  .edit-list__gift-item__image {
    grid-area: image;
    height: 100%;
    width: 10vw;
    align-self: start;
    justify-content: stretch;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    object-fit: cover;
    background-color: var(--v-primary-base);

    @media only screen and (max-width: 1400px) {
      width: 150px;
      border-bottom-left-radius: 0px;
    }
  }

  .edit-list__gift-item__image--edit-active {
    border-bottom-left-radius: 0;
  }

  .edit-list__description {
    grid-area: description;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    justify-self: center;
    justify-content: center;

    .edit-list__description__title {
      font-size: 1.5vw;
      color: var(--v-primary-base);

      @media only screen and (max-width: 1200px) {
        font-size: 1rem;
      }
    }

    .edit-list__description__line {
      border-top: 2px solid var(--v-primary-lighten2);
      margin: 1rem 0;
    }

    .edit-list__description__price {
      font-size: 1.5vw;
      color: var(--v-primary-lighten2);

      @media only screen and (max-width: 1200px) {
        font-size: 1rem;
      }
    }
    .edit-list__description__reserved {
      font-size: 1vw;
      width: 100%;
      background-color: var(--v-quaternary-base);
      margin-top: 1rem;
      padding: 0.5rem;
      border-radius: 0.3rem;
      text-align: center;
    }
  }

  .edit-list__controls {
    grid-area: controls;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.7rem;
    background-color: var(--v-secondary-lighten3);
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 100%;

    @media only screen and (max-width: 1400px) {
      flex-direction: row;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
    }

    .edit-list__controls__buttons {
      display: flex;
      justify-content: space-between;
      width: 100%;

      @media only screen and (max-width: 1400px) {
        width: auto;
      }

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
      color: var(--v-primary-base);
      margin: 0.5rem;
      font-size: 0.8rem;
      padding: 0.8rem 1rem;
      margin: 0.5rem;
      width: 90%;

      &:hover {
        filter: brightness(90%);
      }
    }
    .edit-list__controls__edit-button--edit-active {
      filter: brightness(120%);
    }

    .error-message {
      position: absolute;
    }
  }
  .edit-list__controls--edit-active {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .edit-list__gift-item__edit-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-area: editBox;
    width: 100%;
    padding-top: 2rem;
    background-color: var(--v-secondary-lighten1);
    -webkit-box-shadow: 0px -23px 47px -12px rgba(28, 28, 28, 1);
    -moz-box-shadow: 0px -23px 47px -12px rgba(28, 28, 28, 1);
    box-shadow: 0px -23px 47px -12px rgba(28, 28, 28, 1);
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;

    .edit-list__gift-item__edit-box__input {
      border: 2px solid var(--v-secondary-lighten2);
      border-radius: 5px;
      width: 80%;
      margin-bottom: 1rem;
      color: var(--v-primary-base);
      padding: 0.3rem 0.5rem;
    }

    .edit-list__gift-item__edit-box__checkbox {
      margin-top: 1rem;
      height: 30px;
      width: 30px;
    }

    .edit-list__gift-item__edit-box__label {
      color: var(--v-primary-lighten2);
      width: 80%;
      font-size: 1rem;
      text-align: center;
    }

    .edit-list__gift-item__edit-box__submit-button {
      width: 80%;
      margin-bottom: 2rem;
      background-color: var(--v-secondary-base);

      &:hover {
        filter: brightness(120%);
      }
    }

    .edit-list__gift-item__edit-box__error-message {
      color: var(--v-quaternary-base);
      margin-bottom: 1rem !important;
    }
  }
}
</style>
