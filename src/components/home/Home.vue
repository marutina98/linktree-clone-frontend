<script setup lang="ts">

  const githubURL = 'https://github.com/marutina98';
  const backendRepoURL = 'https://github.com/marutina98/linktree-clone-backend';
  const frontendRepoURL = 'https://github.com/marutina98/linktree-clone-frontend';

</script>

<template>

  <div class="wrapper">

    <div class="left frontend">

      <header>
        <h2>Frontend</h2>
      </header>

      <div class="frontend-content">

        <p>
          You can find the repository for the frontend <a :href="frontendRepoURL">here</a>.
        </p>
        
        <div class="info">
          <header>
            <h3>Info</h3>
          </header>

          <div class="info-content">
            <ul>
              <li>Typescript</li>
              <li>Vue</li>
              <li>Vue Router</li>
              <li>Pinia</li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <div class="right backend">

      <header>
        <h2>Backend</h2>
      </header>

      <div class="backend-content">

        <p>
          You can find the repository for the backend <a :href="backendRepoURL">here</a>.
        </p>

        <div class="features">
          <header>
            <h3>Features</h3>
          </header>

          <div class="features-content">
            <ul>
              <li>Link Creation</li>
              <li>Link Ordering</li>
              <li>Emojis as Link Icons</li>
              <li>Profile Creation</li>
            </ul>
          </div>
        </div>

      </div>

    </div>

    <div class="footer common">
      
      <div class="common-content">
        <p>
          This <strong>LinkTree</strong> clone was written as a learning project by <a :href="githubURL">marutina98</a>.
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
                         'footer footer';
  }

  .footer {
    @apply text-center;
    grid-area: footer;
  }

  .left {
    grid-area: left;
  }

  .right {
    grid-area: right;
  }

  .backend header,
  .frontend header {
    @apply bg-amber-100 text-5xl text-center p-2;
  }

  .backend,
  .frontend,
  .common,
  .features,
  .info {
    @apply border-4 border-amber-100;
  }

  .backend-content,
  .frontend-content,
  .common-content,
  .features-content,
  .info-content {
    @apply flex flex-col gap-2 p-2;
  }

  /* Features and Info */

  .features header,
  .info header {
    @apply text-2xl;
  }

  .features ul,
  .info ul {
    @apply list-disc list-inside;
  }

  .features li,
  .info li {
    @apply indent-2;
  }

</style>