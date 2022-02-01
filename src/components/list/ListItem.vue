<template>
  <div class="gift-list-item">
    <img v-if="imgSrcExists" :src="imgUrl" class="gift-list-item__image" />
    <img
      v-else
      src="../../assets/default_gift_image.svg"
      class="gift-list-item__image"
      alt="giftimage"
    />
    <div v-if="!isEditing" class="gift-list-item__content">
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
            v-if="!isReserved"
            mode="black"
            class="gift-list-item__content__button"
            :class="{
              'gift-list-item__content__button--just-reserved': justReserved,
            }"
            @click.native="toggleViewtoReserveMode"
            >{{ reserveButtonCaption }}</base-button-small
          >
          <base-button-small
            v-else
            mode="black"
            class="gift-list-item__content__button gift-list-item__content__button--reserved"
            >Zarezerwowany</base-button-small
          >
        </div>
      </div>
    </div>
    <div v-else class="gift-list-item__edit-item">
      <img
        src="../../assets/close__icon.svg"
        alt="close_icon"
        class="gift-list-item__edit-item__close-icon"
        @click="toggleViewtoReserveMode"
      />
      <p class="gift-list-item__edit-item__description">
        Aby zarezerwować prezent podaj e-mail. W wiadomości, którą dostaniesz
        potwierdź rezerwację.
      </p>

      <input
        type="text"
        class="gift-list-item__edit-item__input"
        :class="{
          'gift-list-item__edit-item__input--invalid': !reservationName.isValid,
        }"
        id="name"
        v-model="reservationName.val"
        :placeholder="reservationName.placeholder"
      />
      <input
        type="email"
        class="gift-list-item__edit-item__input"
        :class="{
          'gift-list-item__edit-item__input--invalid':
            !reservationEmail.isValid,
        }"
        id="email"
        v-model="reservationEmail.val"
        :placeholder="reservationEmail.placeholder"
      />
      <base-button-small
        class="gift-list-item__edit-item__submit-button"
        @click.native="sendEmail"
        >Zarezerwuj</base-button-small
      >
    </div>
  </div>
</template>
<script>
import emailjs from "emailjs-com";
import BaseButtonSmall from "../ui/BaseButtonSmall.vue";

export default {
  components: { BaseButtonSmall },
  props: ["id", "name", "price", "url", "imgUrl", "quantity", "isReserved"],

  data() {
    return {
      giftId: "",
      imgSrcExists: true,
      isEditing: false,
      reservationName: {
        val: "",
        isValid: true,
        placeholder: "Twoje imię",
      },
      reservationEmail: {
        val: "",
        isValid: true,
        placeholder: "Adres e-mail",
      },
      formIsInvalid: false,
      errorMessage: "",
      justReserved: false,
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
    listOwnerName() {
      return this.$store.getters["userName"];
    },
    owneriId() {
      return this.$route.path.substr(this.$route.path.length - 28);
    },
    reserveButtonCaption() {
      if (this.justReserved === true) {
        return "Sprawdź e-mail";
      } else {
        return "Zarezerwuj";
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
    toggleViewtoReserveMode() {
      this.isEditing = !this.isEditing;
    },

    validateForm() {
      this.formIsInvalid = false;
      this.reservationName.isValid = true;
      this.reservationEmail.isValid = true;

      if (this.reservationName.val.length <= 2) {
        this.formIsInvalid = true;
        this.reservationName.isValid = false;
        this.reservationName.val = "";
        this.reservationName.placeholder =
          "Imię musi miec więcej niż 3 litery.";
      } else if (
        this.reservationEmail.val.length <= 0 ||
        !this.reservationEmail.val.includes("@")
      ) {
        this.formIsInvalid = true;
        this.reservationEmail.isValid = false;
        this.reservationEmail.val = "";
        this.reservationEmail.placeholder = "Podaj prawidłowy e-mail";
      }
    },

    sendEmail() {
      this.validateForm();

      if (this.formIsInvalid) {
        return;
      }
      const serviceId = process.env.VUE_APP_EMAIL_SERVICE_ID;
      const templateId = process.env.VUE_APP_EMAIL_TEMPLATE_ID;
      const userId = process.env.VUE_APP_EMAIL_USER_ID;

      try {
        emailjs.send(
          serviceId,
          templateId,
          {
            list_owner: this.listOwnerName,
            to_name: this.reservationName.val,
            gift_name: this.name,
            gift_price: this.price,
            gift_quantity: this.quantity,
            gift_url: this.url,
            reservation_link: `${location.origin}/reserve-gift/${this.owneriId}/${this.id}`,
            email_to: this.reservationEmail.val,
          },
          userId
        );
        this.justReserved = true;
        this.isEditing = false;
      } catch (error) {
        console.error({ error });
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
  color: var(--v-primary-base);
  width: 100%;
  min-width: 300px;

  @media only screen and (max-width: 1450px) {
    flex-direction: column;
  }

  .gift-list-item__image {
    border-radius: 15px 0px 0 15px;
    height: auto;
    width: 180px;
    object-fit: cover;
    background-color: var(--v-primary-base);

    @media only screen and (max-width: 1300px) {
      width: 140px;
    }

    @media only screen and (max-width: 1450px) {
      border-radius: 15px 15px 0 0px;

      width: 100%;
      height: 150px;
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
        font-size: 1.5rem;
        color: #9aa0a6;

        @media only screen and (max-width: 900px) {
          font-size: 1.2rem;
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
          &--reserved {
            background-color: var(--v-teritary-base) !important;
            border: none;
            pointer-events: none;
          }

          &--just-reserved {
            background-color: #0e7f8e !important;
            pointer-events: none;
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
  .gift-list-item__edit-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
    justify-content: space-around;
    position: relative;

    .gift-list-item__edit-item__close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 30px;
      cursor: pointer;

      &:hover {
        filter: brightness(0.5);
      }
    }

    .gift-list-item__edit-item__description {
      width: 80%;
      text-align: center;
      font-size: 1rem;
      margin-top: 1.2rem;

      @media only screen and (max-width: 1000px) {
        font-size: 0.8rem;
      }
    }

    .gift-list-item__edit-item__input {
      background-color: transparent;
      border: 2px solid var(--v-secondary-lighten4);
      border-radius: 10px;
      font-size: 1rem;
      text-align: left;
      padding-left: 1rem;
      color: var(--v-primary-base);
      height: 40px;
      width: 80%;
      margin: 1.2rem 0;

      @media only screen and (max-width: 1000px) {
        font-size: 0.8rem;
      }
      &--invalid {
        border: 2px solid var(--v-quaternary-base);
      }
    }

    .gift-list-item__edit-item__submit-button {
      width: 150px;
    }
  }
}
</style>
