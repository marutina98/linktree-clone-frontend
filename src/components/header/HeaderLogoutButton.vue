<script setup lang="ts">

  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';
  import { inject } from 'vue';
  import { useSnackbar, Vue3Snackbar } from 'vue3-snackbar';

  const authenticationStore = inject('authentication') as IAuthenticationStore;
  const snackbar = useSnackbar();

  const logout = () => {
    authenticationStore.deleteToken();
    snackbar.add({
      type: 'success',
      text: 'You successfully logged out.',
    });
  }

</script>

<template>
  <button @click="logout">Logout</button>
  <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
</template>

<style scoped>

  @reference 'tailwindcss';

  button {
    @apply bg-white border-b-4 border-b-amber-300 px-4 py-2 uppercase min-w-16;
  }

  button:hover {
    @apply duration-200 ease-in-out scale-125 transition;
  }

</style>