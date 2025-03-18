import { ref } from 'vue';

import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';
import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface.ts';

export const useAuthenticationStore = defineStore('token', () => {

  const cookie = useCookies(['token']);
  const isLogged = ref(false);

  const getToken = () => cookie.get('token');

  const setToken = (token: string) => {
    cookie.set('token', token);
    isLogged.value = true;
  }

  const deleteToken = () => {
    cookie.remove('token');
    isLogged.value = false;
  }

  const checkIfAuthenticated = () => {
    const tokenCookie = cookie.get('token');
    isLogged.value = tokenCookie ? true : false;
  }

  return {
    isLogged,
    cookie,
    getToken,
    setToken,
    deleteToken,
    checkIfAuthenticated,
  }

});