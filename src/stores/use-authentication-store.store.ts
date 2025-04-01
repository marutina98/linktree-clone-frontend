import { ref } from 'vue';

import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

import type { Ref } from 'vue';
import type { IUser } from '@/interfaces/user.interface.ts';

// @todo: streamline this

export const useAuthenticationStore = defineStore('token', () => {

  const cookie = useCookies(['token']);
  const isLogged = ref(false);
  const user: Ref<IUser|null> = ref(null);

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

  const setUser = (_user: IUser|null) => {
    user.value = _user;
  }

  const getUser = () => user.value;

  return {
    user,
    isLogged,
    cookie,
    getToken,
    setToken,
    deleteToken,
    checkIfAuthenticated,
    setUser,
    getUser,
  }

});