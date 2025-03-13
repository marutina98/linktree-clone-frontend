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
    @apply bg-white items-center flex gap-20 m-8 p-4 rounded-full shadow-md shadow-slate-200;
  }

  .navbar-brand {
    @apply max-w-20 ml-2 p-4;
  }

  .navbar-items {
    @apply flex gap-20;
  }

  .navbar-items a {
    @apply uppercase;
  }

</style>