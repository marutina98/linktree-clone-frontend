<script setup lang="ts">

  import type { IAuthenticatedStore } from '@/interfaces/authenticated-store.interface';
  import { inject } from 'vue';

  const authenticationStore = inject('authentication') as IAuthenticatedStore;

  const logout = () => {
    authenticationStore.deleteToken();
  }

</script>

<template>
  <button @click="logout">Logout</button>
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