import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/coachesList.vue';
import CoachesDetails from './pages/coaches/coachesDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoaches from './pages/request/ContactCoaches.vue';
import RequestReceive from './pages/request/RequestReceive.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';

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
    { path: '/register', component: CoachesRegistration },
    { path: '/request', component: RequestReceive },
    { path: '/auth', component: UserAuth },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
