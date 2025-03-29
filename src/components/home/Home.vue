<script setup lang="ts">

  const backendRepoURL = 'https://github.com/marutina98/linktree-clone-backend';
  const frontendRepoURL = 'https://github.com/marutina98/linktree-clone-frontend';

</script>

<template>

  <div class="wrapper">

    <div class="left frontend">

      <header class="frontend">
        <h1>Frontend</h1>
      </header>

      <div class="frontend-content">
        <p>
          You can find the repository for the frontend <a :href="frontendRepoURL">here</a>.
        </p>
      </div>

    </div>

    <div class="right backend">

      <header class="backend">
        <h1>Backend</h1>
      </header>

      <div class="backend-content">
        <p>
          You can find the repository for the backend <a :href="backendRepoURL">here</a>.
        </p>
      </div>

    </div>

    <div class="bottom common">
      
      <div class="common-content">
        <p>
          This <strong>LinkTree</strong> clone was written as a learning project.
        </p>
      </div>

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
    @apply gap-4 grid p-4;
    grid-template-areas: 'left right'
                         'bottom bottom';
  }

  .bottom {
    grid-area: bottom;
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }

  header.backend,
  header.frontend {
    @apply bg-amber-100 text-5xl text-center p-2;
  }

  .backend,
  .frontend,
  .common {
    @apply border-4 border-amber-100;
  }

  .backend-content,
  .frontend-content,
  .common-content {
    @apply p-2;
  }

</style>