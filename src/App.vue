<script setup lang="ts">

  import { useRoute } from 'vue-router';

  import Header from './components/header/Header.vue';
  import Footer from './components/footer/Footer.vue';
  import { computed } from 'vue';

  import { Vue3Snackbar } from 'vue3-snackbar';

  // Get current route

  const route = useRoute();

  // Pages where Header and Footer are *not* visible

  const hideHeader = ['/login', '/signup'];
  const hideFooter = ['/login', '/signup'];

  const isHeaderHidden = computed(() => hideHeader.includes(route.path));
  const isFooterHidden = computed(() => hideFooter.includes(route.path));

  // Add class to main if header and footer are hidden

  const isFull = computed(() => {
    return isHeaderHidden.value && isFooterHidden.value;
  });

</script>

<template>

  <Header v-if="!isHeaderHidden" />

  <main :class="{ 'is-full': isFull }">
    <RouterView />
  </main>

  <Footer v-if="!isFooterHidden" />

  <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>
  
</template>

<style scoped>

  @reference 'tailwindcss';

  main {
    @apply bg-gray-50 grow shrink;
  }

  main.is-full {
    @apply flex h-screen items-center justify-center w-screen;
  }

</style>
