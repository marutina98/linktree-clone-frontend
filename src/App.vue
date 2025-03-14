<script setup lang="ts">
  import Header from './components/header/Header.vue';
  import Footer from './components/footer/Footer.vue';

  import { inject } from 'vue';

</script>

<template>

  <Header class="header" />

  <main>
    <RouterView />
  </main>

  <Footer/>
  
</template>

<style scoped>

  @reference 'tailwindcss';

  main {
    @apply grow shrink;
  }

</style>
