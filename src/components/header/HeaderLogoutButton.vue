<script setup lang="ts">

  import { inject } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSnackbar } from 'vue3-snackbar';


  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';

  const authenticationStore = inject('authentication') as IAuthenticationStore;
  const snackbar = useSnackbar();

  const router = useRouter();

  const logout = () => {
    
    authenticationStore.deleteToken();
    authenticationStore.setUser(null);

    router.push({
        path: '/'
      });

    snackbar.add({
      type: 'success',
      text: 'You successfully logged out.',
    });

  }

</script>

<template>
  <button @click="logout">Logout</button>
</template>

<style scoped>

  @reference 'tailwindcss';

  button {
    @apply bg-white border-b-4 border-b-amber-300 cursor-pointer px-4 py-2 uppercase min-w-16;
  }

  button:hover {
    @apply duration-200 ease-in-out scale-125 transition;
  }

</style>