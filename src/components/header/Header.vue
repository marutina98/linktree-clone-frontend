<script setup lang="ts">

  import type { IAuthenticatedStore } from '@/interfaces/authenticated-store.interface';
  import type { INavItem } from '@/interfaces/nav-item.interface';
  import { inject, onBeforeMount, ref } from 'vue';
  import HeaderLogoutButton from './HeaderLogoutButton.vue';

  // Nav

  const brandName: string = 'Brand';

  const navItems: INavItem[] = [
    { href: '/', text: 'Home' }
  ];

  // Get Authentication Status from
  // authenticationStore

  // Check the status before mounting
  // component

  const authenticationStore = inject('authentication') as IAuthenticatedStore;
  
  onBeforeMount(() => {
    authenticationStore.checkIfAuthenticated();
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

        <template v-if="!authenticationStore.isLogged">
          <RouterLink to="/login">Login</RouterLink>
          <RouterLink to="/signup">Signup</RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <HeaderLogoutButton />
        </template>

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