<script setup lang="ts">

  const githubURL = 'https://github.com/marutina98';
  const backendRepoURL = 'https://github.com/marutina98/linktree-clone-backend';
  const frontendRepoURL = 'https://github.com/marutina98/linktree-clone-frontend';

</script>

<template>

  <div class="wrapper">

    <span class="project-name">LinkTree Clone</span>
    <div class="project-repos">
      <a :href="backendRepoURL">Backend</a>
      <a :href="frontendRepoURL">Frontend</a>
    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  a {
    @apply text-amber-500 underline;
  }

  a:hover,
  a:focus {
    @apply text-amber-700;
  }

  .wrapper {
    @apply flex flex-col items-center justify-center;
    --header-height: 90px;
    --footer-height: 70px;
    height: calc(100vh - (var(--header-height) + var(--footer-height)));
  }

  .project-name {
    @apply text-5xl;
  }

</style>