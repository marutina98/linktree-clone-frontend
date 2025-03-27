<script setup lang="ts">

  import { onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  onBeforeMount(() => {
    router.push({
      path: 'not-found'
    });
  });

</script>

<template>
  <div class="error">
    <span>404</span>
    <span>Page not found</span>
    <RouterLink to="/">Go back Home</RouterLink>
  </div>
</template>

<script scoped>
</script>