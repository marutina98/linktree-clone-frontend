<script setup lang="ts">

  const backendRepoURL = 'https://github.com/marutina98/linktree-clone-backend';
  const frontendRepoURL = 'https://github.com/marutina98/linktree-clone-frontend';

  const bgImage = '@/assets/honey-svgrepo-com.svg';

</script>

<template>

  <div class="wrapper">

    <div class="wrapper-effect"></div>

    <div class="wrapper-content">
      <span class="project-name">Just a LinkTree Clone</span>

      <div class="project-repos">
        <a :href="frontendRepoURL">Frontend</a>
        <div class="project-repos-divider"></div>
        <a :href="backendRepoURL">Backend</a>
      </div>
    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  a {
    @apply text-amber-500;
  }

  a:hover,
  a:focus {
    @apply text-amber-700;
  }

  .wrapper {
    @apply flex flex-col gap-2 items-center justify-center;
    --header-height: 90px;
    --footer-height: 70px;
    height: calc(100vh - (var(--header-height) + var(--footer-height)));
    position: relative;
  }

  .wrapper-effect {
    @apply w-full h-full absolute bg-repeat-space block;
    content: '';
    background-image: url('@/assets/honey-svgrepo-com.svg');
    background-position: center center;
    background-size: 100px 100px;
    border-bottom: 10px solid white;
    border-top: 10px solid white;
    opacity: .05;
  }
  
  .wrapper-content {
    z-index: 1;
  }

  .project-name {
    @apply text-6xl;
  }

  .project-repos {
    @apply flex flex-row gap-4 items-center justify-center text-3xl;
  }

  .project-repos-divider {
    @apply bg-gray-300 h-8;
    width: 1px;
  }

</style>