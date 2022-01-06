export default {
  gifts(state) {
    return state.gifts;
  },
  userName(state) {
    return state.userName;
  },
  hasGifts(state) {
    return state.gifts && state.gifts.length > 0;
  },
};
