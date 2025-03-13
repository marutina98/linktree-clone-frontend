<script setup lang="ts">
  import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main>
    
    <p>Main</p>

    <RouterView />
  </main>

  <footer>
    <!-- TODO: Footer -->
  </footer>
</template>

<style scoped>
</style>
