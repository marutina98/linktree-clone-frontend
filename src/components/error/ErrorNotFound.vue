<script setup lang="ts">

  import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="error">
    <span class="error-number">404</span>
    <span class="error-text">Page not found</span>
    <RouterLink class="error-redirect" to="/">Go back Home</RouterLink>
  </div>
</template>

<style scoped>

  @reference 'tailwindcss';

  .error {
    @apply flex flex-col gap-4 items-center;
  }

  .error-number {
    @apply font-bold text-9xl;
  }

  .error-text {
    @apply text-5xl;
  }

  .error-redirect {
    @apply text-amber-600;
  }

  .error-redirect:hover {
    @apply text-amber-800;
  }

</style>