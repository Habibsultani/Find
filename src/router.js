import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/coachesList.vue';
import CoachesDetails from './pages/coaches/coachesDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoaches from './pages/request/ContactCoaches.vue';
import RequestReceive from './pages/request/RequestReceive.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachesDetails,
      children: [{ path: 'contact', component: ContactCoaches }],
    },
    {
      path: '/register',
      component: CoachesRegistration,
      meta: { isAuth: true },
    },
    { path: '/request', component: RequestReceive, meta: { isAuth: true } },
    { path: '/auth', component: UserAuth, meta: { isUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.isAuth && !store.getters.token) {
    next('/auth');
  } else if (to.meta.isUnAuth && store.getters.token) {
    next('/coaches');
  } else {
    next(true);
  }
});

export default router;
