import { createMemoryHistory, createRouter, type RouteLocationNormalized } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import DashboardPage from '@/pages/DashboardPage.vue';

import { isAuthenticatedGuard } from '@/guards/is-authenticated.guard.ts';
import { isGuestGuard } from '@/guards/is-guest.guard.ts';
import { useAuthenticationStore } from '@/stores/use-authentication-store.store.ts';

const routes = [

  {
    path: '/',
    component: HomePage
  },

  {
    path: '/login',
    component: LoginPage,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      isGuestGuard(store, to, from);
    }
  },

  {
    path: '/signup',
    component: SignupPage,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      isGuestGuard(store, to, from);
    }
  },

  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      isAuthenticatedGuard(store, to, from);
    }
  }

];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;