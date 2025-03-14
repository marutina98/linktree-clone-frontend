import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies';

const cookie = useCookies(['token']);

// export const useAuthenticatedStore = defineStore('authenticated', {

//   state: () => ({
//     status: false
//   }),

//   actions: {
//     checkStatus() {
//       const token = cookie.get('token');
//       this.status = token ? true : false;
//     }
//   }

// });

export const useAuthenticatedStore = defineStore('authenticated', () => {

  const status = ref(false);

  const checkAuthenticatedStatus = () => {
    const token = cookie.get('token');
    console.log(token);
    status.value = token ? true : false;
  }

  const $reset = () => status.value = false;

  return {
    status,
    $reset,
    checkAuthenticatedStatus
  }

});