<script setup lang="ts">

  interface INavItem {
    href: string,
    text: string,
  }
  
  const svg = './images/branch-vase-svgrepo-com.svg';

  const navItems: INavItem[] = [
    { href: '/', text: 'Home' }
  ];

</script>

<template>
  <nav class="bg-pink-200 items-center flex gap-4 p-4 m-4 rounded-xl">
    <div class="max-w-16">
      <img :src="svg" alt="Branch Vase">
    </div>
    <template v-if="navItems.length > 0">
      <div>
        <RouterLink :to="item.href" v-for="item of navItems">{{ item.text }}</RouterLink>
      </div>
    </template>
  </nav>
</template>

<style scoped>
</style>