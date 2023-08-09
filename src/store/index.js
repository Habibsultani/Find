import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index.js';
import requestModule from './modules/requests/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    request: requestModule,
  },
  state() {
    return {
      userId: 'c3',
    };
  },
  getters: {
    UserID(state) {
      return state.userId;
    },
  },
});

export default store;
