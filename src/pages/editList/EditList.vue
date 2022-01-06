<template>
  <base-card class="base-card">
    <h1>Twoja lista</h1>
    <base-button-large
      v-if="!formOpened"
      @click.native="menageFormTab"
      mode="flat"
      class="addGift"
      >Dodaj prezent</base-button-large
    >

    <form v-if="formOpened" @submit.prevent="submitForm">
      <div>
        <p>Dodaj pomysł na prezent</p>
        <img src="../../assets/close__icon.svg" alt="" @click="menageFormTab" />
      </div>
      <label for="name">Nazwa</label>
      <input id="name" type="text" v-model="name.val" />
      <label for="price">Cena</label>
      <input id="price" type="number" v-model="price.val" />
      <label for="url">Link do oferty</label>
      <input id="url" type="text" v-model="url.val" />
      <label for="imgUrl">Link do zdjęcia prezentu</label>
      <input id="imgUrl" type="text" v-model="imgUrl.val" />
      <p class="error-message">{{ errorMessage }}</p>
      <base-button-small class="save-gift-button">Zapisz</base-button-small>
    </form>
    <div class="list">
      <ul class="gifts-list">
        <edit-list-gift-item
          v-for="gift in gifts"
          :id="gift.id"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          class="list-item"
        ></edit-list-gift-item>
      </ul>
    </div>
  </base-card>
</template>
<script>
import EditListGiftItem from "../../components/editListItem/EditListGiftItem.vue";
export default {
  components: {
    EditListGiftItem,
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
      errorMessage: "",
      isLoading: false,
      gifts: [],
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    menageFormTab() {
      this.formOpened = !this.formOpened;
    },
    validateForm() {
      this.errorMessage = "";
      this.formIsValid = true;
      if (this.name.val === "") {
        this.name.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj nazwę prezentu.";
      }
      if (!this.price.val || this.price.val < 0) {
        this.price.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj cenę - pamiętaj, aby była większa od 0.";
      }
      if (this.url.val === "") {
        this.url.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj prawidłowy adres do prezentu.";
      }
      if (this.imgUrl.val === "") {
        this.imgUrl.isValid = false;
        this.formIsValid = false;
        this.errorMessage = "Podaj prawidłowy adres do zdjęcia prezentu.";
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
    },

    async loadGifts() {
      this.isLoading = true;
      try {
        const userId = this.$store.getters.userId;
        await this.$store.dispatch("gifts/loadGifts", userId);
        this.gifts = this.$store.getters["gifts/gifts"];
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
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
  h1 {
    color: #fefefe;
    font-size: 3rem;
    margin-bottom: 4rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-content: center;
    width: 50%;
    padding: 0rem 1rem 2rem 1rem;
    border: 2px solid #9aa0a6;
    border-radius: 20px;
    div {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 1fr;
      gap: 0px 0px;
      grid-template-areas: ". title closeIcon";
      margin: 1.5rem 0;
      p {
        grid-area: title;
        justify-self: center;
        font-size: 1.6rem;
        color: #fefefe;
      }
      img {
        grid-area: closeIcon;
        justify-self: end;
        align-self: start;
        height: 25px;
        margin-right: 5px;
        cursor: pointer;
      }
    }
    label {
      font-size: 1.3rem;
      text-align: center;
      color: #9aa0a6;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    label:nth-child(1) {
      margin-top: 1rem;
    }
    input {
      background-color: transparent;
      border: 2px solid #9aa0a6;
      border-radius: 20px;
      font-size: 1rem;
      padding-left: 1rem;
      color: #fefefe;
      height: 40px;
      width: 80%;
      align-self: center;
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
    .save-gift-button {
      border: 1px solid #9aa0a6;
      margin-top: 2rem;
      width: 20%;
      padding: 0.5rem;
      align-self: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield;
    }
    .error-message {
      color: red;
      text-align: center;
      margin-top: 1rem;
      letter-spacing: 1px;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 400px;
    background-color: #171717;
    margin: 3rem 10% 0 10%;
    .list-item {
      background-color: #35363c;
    }
  }
  .addGift {
    margin-bottom: 3rem;
  }
}
.close-enter-active,
.close-leave-active {
  transition: opacity 0.5s;
}
.close-enter, .close-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
