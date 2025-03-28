import { createWebHistory, createRouter, useRoute, type RouteLocationNormalized, type RouteLocationGeneric } from 'vue-router';

import Home from '@/components/home/Home.vue';
import Login from '@/components/login/Login.vue';
import Signup from '@/components/signup/Signup.vue';
import Dashboard from '@/components/dashboard/Dashboard.vue';
import Profile from '@/components/profile/Profile.vue';

import ErrorRedirect from '@/components/error/ErrorRedirect.vue';
import ErrorNotFound from '@/components/error/ErrorNotFound.vue';

import { isAuthenticatedGuard } from '@/guards/is-authenticated.guard.ts';
import { isGuestGuard } from '@/guards/is-guest.guard.ts';
import { useAuthenticationStore } from '@/stores/use-authentication-store.store.ts';

import { apiService } from '@/services/api.service.ts';

const route = useRoute();

const routes = [

  {
    path: '/:pathMatch(.*)*',
    component: ErrorRedirect
  },

  {
    path: '/not-found',
    component: ErrorNotFound
  },

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

  // Fetch User via Props

  {
    path: '/profile/:id',
    component: Profile,
    props: {
      getUser: async (route: RouteLocationGeneric) => {
        const id = route.params.id as string;
        const request = await apiService.getUser(id);
        return request;
      }
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;