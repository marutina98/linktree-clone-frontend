<script setup lang="ts">
  import NavBar from './components/NavBar.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    <RouterView />
  </main>

  <Footer />
</template>

<style scoped>
  @reference 'tailwindcss';

  main {
    @apply grow shrink;
  }
</style>
