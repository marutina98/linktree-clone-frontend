<script setup lang="ts">
import INavItem from '@/interfaces/nav-item.interface';


  const brandLogo = {
    src: './images/lemon-svgrepo-com.svg',
    alt: 'Lemon',
  }

  const navItems: INavItem[] = [
    { href: '/', text: 'Home' }
  ];

</script>

<template>

  <nav class="nav">
    <div class="nav-brand">
      <img class="nav-brand-img" v-bind="brandLogo">
    </div>

    <div class="nav-items">
      <RouterLink v-for="item of navItems" :to="item.href">{{ item.text }}</RouterLink>
    </div>

    <div class="nav-authentication">
      <button class="nav-authentication-btn btn-login">Login</button>
      <button class="nav-authentication-btn btn-signup">Register</button>
    </div>
  </nav>

</template>

<style scoped>

  @reference 'tailwindcss';

  .nav {
    @apply bg-lime-100 flex flex-row gap-2 m-6 p-4 rounded-full;
  }

  .nav-brand {
    @apply bg-white ml-2 p-2 rounded-full;
  }
  
  .nav-brand-img {
    @apply max-w-20;
  }

  .nav-items {
    @apply grow shrink;
  }

  .nav-item {

  }

  .nav-authentication {
    @apply flex flex-row gap-4 items-center;
  }

  .nav-authentication-btn {
    cursor: pointer;
  }

</style>