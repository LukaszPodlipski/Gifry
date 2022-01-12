export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  setName(state, payload) {
    state.userName = payload;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
