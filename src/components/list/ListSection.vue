<template>
  <div class="gifts-list">
    <div class="gifts-list__element" v-if="giftsTo50.length > 0">
      <p class="gifts-list__element__description">Do 50 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo50"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsTo100.length > 0">
      <p class="gifts-list__element__description">Do 100 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo100"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsTo200.length > 0">
      <p class="gifts-list__element__description">Do 200 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo200"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsTo300.length > 0">
      <p class="gifts-list__element__description">Do 300 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo300"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsTo500.length > 0">
      <p class="gifts-list__element__description">Do 500 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo500"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsTo1000.length > 0">
      <p class="gifts-list__element__description">Do 1000 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsTo1000"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
    <div class="gifts-list__element" v-if="giftsUnder1000.length > 0">
      <p class="gifts-list__element__description">Powyżej 1000 zł</p>
      <ul class="gifts-list__element__list">
        <list-item
          v-for="gift in giftsUnder1000"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :quantity="gift.quantity"
          class="gifts-list__element__list__item"
        ></list-item>
      </ul>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  props: [
    "giftsTo50",
    "giftsTo100",
    "giftsTo200",
    "giftsTo300",
    "giftsTo500",
    "giftsTo1000",
    "giftsUnder1000",
  ],
  components: {
    ListItem,
  },
};
</script>

<style lang="scss" scoped>
.gifts-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .gifts-list__element {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .gifts-list__element__description {
      color: #fefefe;
      font-size: 1.2rem;
      margin-bottom: -20px;
      background-color: #0e7f8e;
      padding: 0.5rem 1rem 1.2rem 1rem;
      transform: translateY(30px);
      z-index: -1;
      border-radius: 10px 10px 0px 0px;
      min-width: 300px;
      width: 100%;
    }

    .gifts-list__element__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .gifts-list__element__list__item:hover {
        -webkit-box-shadow: 8px 8px 24px -15px rgba(0, 0, 0, 0.79);
        -moz-box-shadow: 8px 8px 24px -15px rgba(0, 0, 0, 0.79);
        box-shadow: 8px 8px 24px -15px rgba(0, 0, 0, 0.79);
      }
    }
  }
}
</style>
