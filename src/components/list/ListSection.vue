<template>
  <div class="list">
    <div class="listElement" v-if="giftsTo50.length > 0">
      <p>Do 50 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo50"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsTo100.length > 0">
      <p>Do 100 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo100"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsTo200.length > 0">
      <p>Do 200 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo200"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsTo300.length > 0">
      <p>Do 300 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo300"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsTo500.length > 0">
      <p>Do 500 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo500"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsTo1000.length > 0">
      <p>Do 1000 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsTo1000"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
        ></list-item>
      </ul>
    </div>
    <div class="listElement" v-if="giftsUnder1000.length > 0">
      <p>Powyżej 1000 zł</p>
      <ul class="list">
        <list-item
          v-for="gift in giftsUnder1000"
          :key="gift.id"
          :name="gift.name"
          :price="gift.price"
          :url="gift.url"
          :imgUrl="gift.imgUrl"
          :show="gift.show"
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
.list {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .listElement {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      color: #fefefe;
      font-size: 1.2rem;
      margin-bottom: -20px;
      background-color: #8e0e0f;
      padding: 0.5rem 1rem 1.2rem 1rem;
      transform: translateY(30px);
      z-index: -1;
      border-radius: 10px 10px 0px 0px;
    }
    .list {
      .gift {
        width: 100%;
      }
    }
  }
}
</style>
