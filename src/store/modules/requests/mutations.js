export default {
  addRequest(state, payload) {
    return state.requests.push(payload);
  },
  newFetch(state, payload) {
    state.requests = payload;
  },
};
