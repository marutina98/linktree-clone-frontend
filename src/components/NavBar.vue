<script setup lang="ts">

  import INavBarItem from '@/interfaces/navbar-item.interface';
  
  const brandIcon = {
    src: './images/branch-vase-svgrepo-com.svg',
    alt: 'Branch Vase'
  };

  const navBarItems: INavBarItem[] = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' }
  ];

</script>

<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img v-bind="brandIcon">
    </div>
    <div class="navbar-items">
      <a v-for="navBarItem of navBarItems" :href="navBarItem.href">{{ navBarItem.text }}</a>
    </div>
  </nav>
</template>

<style scoped>

  @reference 'tailwindcss';

  .navbar {
    @apply items-center flex gap-8 p-8;
  }

  .navbar-brand {
    @apply bg-pink-200 max-w-20 p-4 rounded-full;
  }

  .navbar-brand:hover {
    @apply animate-spin;
  }

  .navbar-items {
    @apply flex gap-8;
  }

  .navbar-items a {
    @apply uppercase;
  }

</style>