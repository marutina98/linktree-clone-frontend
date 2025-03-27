import { createWebHistory, createRouter, type RouteLocationNormalized } from 'vue-router';

import Home from '@/components/home/Home.vue';
import Login from '@/components/login/Login.vue';
import Signup from '@/components/signup/Signup.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import Profile from '@/components/profile/Profile.vue';

import { isAuthenticatedGuard } from '@/guards/is-authenticated.guard.ts';
import { isGuestGuard } from '@/guards/is-guest.guard.ts';
import { useAuthenticationStore } from '@/stores/use-authentication-store.store.ts';

import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface.ts';

const routes = [

  {
    path: '/',
    component: Home
  },

  {
    path: '/login',
    component: Login,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isGuestGuard(store, to, from);
    }
  },

  {
    path: '/signup',
    component: Signup,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isGuestGuard(store, to, from);
    }
  },

  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isAuthenticatedGuard(store, to, from);
    }
  },

  {
    path: '/profile/:id',
    component: Profile,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;