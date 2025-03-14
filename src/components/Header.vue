<script setup lang="ts">

  // Stores & Services

  import { useAuthenticatedStore } from '@/stores/use-authenticated-store.store';
  import { authenticationService } from '@/services/authentication.service';

  // Interfaces

  import INavItem from '@/interfaces/nav-item.interface';
  import { ref, onBeforeMount } from 'vue';

  // Services

  const brandName: string = 'Brand';

  const navItems: INavItem[] = [
    { href: '/', text: 'Home' }
  ];

  // Use the useAuthenticatedStore to check if the user
  // is authenticated or not by subscribing to it.

  const authenticatedStore = useAuthenticatedStore();
  
  const isLogged = ref(authenticatedStore.status);

  authenticatedStore.$subscribe((_mutation, state) => {
    isLogged.value = state.status;
  });

  // Before Mount, check the authenticated status

  onBeforeMount(() => {
    authenticatedStore.checkAuthenticatedStatus();
  });

</script>

<template>

  <header>

    <nav>
      <div class="nav-brand">
        <h1>{{ brandName }}</h1>
      </div>

      <div class="nav-items">

        <RouterLink v-for="item of navItems" :to="item.href">{{ item.text }}</RouterLink>

        <template v-if="!isLogged">
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/signup">Signup</RouterLink>
        </template>

        <RouterLink v-else to="/dashboard">Dashboard</RouterLink>

      </div>
    </nav>

  </header>

</template>

<style scoped>

  @reference 'tailwindcss';

  nav {
    @apply bg-amber-100 flex gap-8 items-center text-amber-600 px-8 py-6;
  }

  .nav-brand {
    @apply flex font-extrabold grow shrink tracking-[.5em] uppercase;
  }

  .nav-items {
    @apply flex gap-8;
  }

  .nav-items a {
    @apply bg-white border-b-4 border-b-amber-300 px-4 py-2 uppercase min-w-16;
  }

  .nav-items a:hover {
    @apply duration-200 ease-in-out scale-125 transition;
  }

  .nav-items .router-link-active {
    @apply font-extrabold;
  }

</style>