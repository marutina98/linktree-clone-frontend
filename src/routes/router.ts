import { createWebHistory, createRouter, useRoute, type RouteLocationNormalized, type RouteLocationGeneric, type RouteLocationNormalizedGeneric } from 'vue-router';

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
import type { IUser } from '@/interfaces/user.interface.ts';

const routes = [

  {
    path: '/:pathMatch(.*)*',
    component: ErrorRedirect
  },

  {
    path: '/not-found',
    component: ErrorNotFound,
    meta: {
      title: 'Not Found'
    }
  },

  {
    path: '/',
    component: Home,
    meta: {
      title: 'Home'
    }
  },

  {
    path: '/login',
    component: Login,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isGuestGuard(store, to, from);
    },
    meta: {
      title: 'Login'
    }
  },

  {
    path: '/signup',
    component: Signup,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isGuestGuard(store, to, from);
    },
    meta: {
      title: 'Signup'
    }
  },

  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const store = useAuthenticationStore();
      return isAuthenticatedGuard(store, to, from);
    },
    meta: {
      title: 'Dashboard'
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

// Dynamic Title

router.beforeEach(async (to, _from, next) => {

  const appName = 'LinkTree Clone';

  const { title } = to.meta;
  const id = to.params.id as string ?? null;

  const getDefaultTitle = () => {
    return title ? `${title} - ${appName}` : appName;
  }

  // If there is no id get the default
  // title, otherwise fetch user and get name

  if (!id) {

    document.title = getDefaultTitle();

  } else {
    
    const request = await apiService.getUser(id);

    // If the request is ok, use username as title
    // otherwise profile

    if (request.ok) {
      const response = await request.json() as IUser;
      document.title = `${response.profile.name} - ${appName}`;
    } else {
      document.title = `Profile - ${appName}`;
    }
    
  }

  next();

});

export default router;