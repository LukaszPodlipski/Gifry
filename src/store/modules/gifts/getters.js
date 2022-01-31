export default {
  gifts(state) {
    return state.gifts;
  },
  reservedGift(state) {
    return state.reservedGift;
  },
  userName(state) {
    return state.userName;
  },
  hasGifts(state) {
    return state.gifts && state.gifts.length > 0;
  },
};
