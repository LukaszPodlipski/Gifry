export default {
  addGift(state, payload) {
    state.gifts.push(payload);
  },
  setGifts(state, payload) {
    state.gifts = payload;
  },
  setReservedGift(state, payload) {
    state.reservedGift = payload;
  },
};
