export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.token;
    state.expireation = payload.token;
  },
};
