import { createMemoryHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignupPage from '@/pages/SignupPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;