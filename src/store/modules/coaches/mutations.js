export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },

  setTheCoache(state, payload) {
    state.coaches = payload;
  },
};
