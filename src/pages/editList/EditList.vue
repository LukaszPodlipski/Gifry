<template>
  <base-card class="base-card">
    <template v-slot:title>
      <h1>Twoja lista</h1>
    </template>

    <base-button-large
      v-if="!formOpened"
      @click.native="menageFormTab"
      mode="flat"
      class="add-gift-button"
      >{{ addGiftButtonCaption }}
    </base-button-large>

    <form v-if="formOpened" @submit.prevent="submitForm" class="add-gift-form">
      <div class="add-gift-form__header">
        <p class="header__title">Dodaj pomysł na prezent</p>
        <img
          src="../../assets/close__icon.svg"
          alt=""
          @click="menageFormTab"
          class="header__close-icon"
        />
      </div>
      <label for="name" class="add-gift-form__label">Nazwa</label>
      <input
        id="name"
        type="text"
        v-model="name.val"
        class="add-gift-form__input"
      />
      <label for="price" class="add-gift-form__label">Cena</label>
      <input
        id="price"
        type="number"
        v-model.trim="price.val"
        class="add-gift-form__input"
      />
      <label for="url" class="add-gift-form__label">Link do oferty</label>
      <input
        id="url"
        type="text"
        v-model="url.val"
        class="add-gift-form__input"
      />
      <label for="imgUrl" class="add-gift-form__label"
        >Link do zdjęcia prezentu</label
      >
      <input
        id="imgUrl"
        type="text"
        v-model="imgUrl.val"
        class="add-gift-form__input"
      />
      <p class="error-message">{{ errorSaveGiftMessage }}</p>
      <base-button-small class="save-gift-button">Zapisz</base-button-small>
    </form>

    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else-if="gifts" class="list">
      <ul class="gifts-list">
        <edit-list-gift-item
          v-for="gift in gifts"
          :id="gift.id"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
          class="list-item"
          @delete-gift="deleteGift"
        ></edit-list-gift-item>
      </ul>
    </div>
    <p class="menage-gift-error" v-if="errorMenageGiftsMessage">
      {{ errorMenageGiftsMessage }}
    </p>
  </base-card>
</template>
<script>
import EditListGiftItem from "../../components/editListItem/EditListGiftItem.vue";
import BaseSpinner from "../../components/ui/BaseSpinner.vue";
export default {
  components: {
    EditListGiftItem,
    BaseSpinner,
  },
  data() {
    return {
      formOpened: false,
      name: {
        val: "",
        isValid: true,
      },
      price: {
        val: null,
        isValid: true,
      },
      url: {
        val: "",
        isValid: true,
      },
      imgUrl: {
        val: null,
        isValid: true,
      },
      formIsValid: true,
      errorSaveGiftMessage: "",
      errorMenageGiftsMessage: "",
      isLoading: false,
      gifts: [],
    };
  },

  computed: {
    addGiftButtonCaption() {
      if (this.gifts.length < 1) {
        return "Dodaj pierwszy prezent";
      } else {
        return "Dodaj kolejny prezent";
      }
    },
  },

  methods: {
    clearFormInputs() {
      this.name.val = "";
      this.price.val = "";
      this.url.val = "";
      this.imgUrl = "";
    },

    menageFormTab() {
      this.formOpened = !this.formOpened;
    },

    validateForm() {
      this.errorSaveGiftMessage = "";
      this.formIsValid = true;

      if (this.name.val === "" || this.name.val.length > 60) {
        this.name.isValid = false;
        this.formIsValid = false;
        this.errorSaveGiftMessage = "Podaj nazwę prezentu (max 60 znaków)";
      }

      if (!this.price.val || this.price.val < 0) {
        this.price.isValid = false;
        this.formIsValid = false;
        this.errorSaveGiftMessage =
          "Podaj cenę - pamiętaj, aby była większa od 0.";
      }

      if (this.url.val === "") {
        this.url.isValid = false;
        this.formIsValid = false;
        this.errorSaveGiftMessage = "Podaj prawidłowy adres do prezentu.";
      }

      if (this.imgUrl.val === "") {
        this.imgUrl.isValid = false;
        this.formIsValid = false;
        this.errorSaveGiftMessage =
          "Podaj prawidłowy adres do zdjęcia prezentu.";
      }
    },

    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.formOpened = false;

      const formData = {
        name: this.name.val,
        price: this.price.val,
        url: this.url.val,
        imgUrl: this.imgUrl.val,
      };

      this.$store.dispatch("gifts/addGift", formData);
      this.clearFormInputs();
    },

    async loadGifts() {
      this.isLoading = true;

      try {
        const userId = this.$store.getters.userId;
        await this.$store.dispatch("gifts/loadGifts", userId);
        this.gifts = this.$store.getters["gifts/gifts"];
      } catch (error) {
        this.errorMenageGiftsMessage =
          error.message || "Wystąpił problem z załadowaniem prezentów.";
      }

      this.isLoading = false;
    },

    async deleteGift(giftId) {
      try {
        await this.$store.dispatch("gifts/deleteGift", {
          giftId: giftId,
        });
        this.loadGifts();
      } catch (error) {
        this.errorMenageGiftsMessage =
          error.message || "Wystąpił problem z usunięciem prezentu.";
      }
    },
  },

  created() {
    this.loadGifts();
  },
};
</script>

<style lang="scss" scoped>
.base-card {
  margin-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .add-gift-form {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 50%;
    padding: 0rem 1rem 2rem 1rem;
    border: 2px solid #444749;
    border-radius: 20px;
    margin: 3rem 0;

    .add-gift-form__header {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 1fr;
      gap: 0px 0px;
      grid-template-areas: ". title closeIcon";
      margin: 1.5rem 0;

      .header__title {
        grid-area: title;
        justify-self: center;
        font-size: 1.6rem;
        color: #fefefe;
        text-align: center;
      }

      .header__close-icon {
        grid-area: closeIcon;
        justify-self: end;
        align-self: start;
        height: 25px;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .add-gift-form__label {
      font-size: 1.3rem;
      text-align: center;
      color: #9aa0a6;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .add-gift-form__label:nth-child(1) {
      margin-top: 1rem;
    }

    .add-gift-form__input {
      background-color: transparent;
      border: 2px solid #444749;
      border-radius: 10px;
      font-size: 1rem;
      text-align: left;
      padding-left: 1rem;
      color: #fefefe;
      height: 40px;
      width: 80%;
      align-self: center;

      &:hover {
        border-color: #a0a0a0 #b9b9b9 #b9b9b9 #b9b9b9;
      }

      &:focus {
        border-color: #4d90fe;
      }

      &[type="submit"] {
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

      &[type="submit"]:hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background: #f8f8f8;
        border: 1px solid #c6c6c6;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        color: #222;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type="number"] {
        -moz-appearance: textfield;
      }
    }

    .save-gift-button {
      border: 1px solid #444749;
      margin-top: 2rem;
      width: 20%;
      padding: 0.5rem;
      align-self: center;
    }

    .error-message {
      color: #0e7f8e;
      text-align: center;
      margin-top: 1rem;
      letter-spacing: 1px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 3rem 10% 0 10%;
    padding: 0 1rem;
    background-color: #171717;
    border-radius: 10px;

    .list-item {
      background-color: #35363c;
    }

    .list-item:nth-child(even) {
      background-color: #242424;
    }
    .list-item:hover {
      -webkit-box-shadow: 8px 8px 24px -15px rgba(62, 62, 62, 0.79);
      -moz-box-shadow: 8px 8px 24px -15px rgba(62, 62, 62, 0.79);
      box-shadow: 8px 8px 24px -15px rgba(62, 62, 62, 0.79);
    }
  }

  .add-gift-button {
    background-color: #0e7f8e;
    border: none;
    margin: 3rem;
    border-radius: 10px;

    &:hover {
      border: none;
      filter: brightness(90%);
    }
  }
  .menage-gift-error {
    text-align: center;
    color: #fefefe;
    font-size: 1.5rem;
    background-color: #0e7f8e;
    padding: 1rem 2rem;
    margin: 1rem;
    align-self: center;
    border-radius: 15px;
    margin-bottom: 1rem;
  }
}
</style>
