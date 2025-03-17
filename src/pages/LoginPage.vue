<script setup lang="ts">

  import { ref } from 'vue';
  import { useSnackbar, Vue3Snackbar } from 'vue3-snackbar';

  const inputEmail = ref('');
  const inputPassword = ref('');

  const snackbar = useSnackbar();
  
  const onSubmit = () => {
    
    snackbar.add({
      type: 'success',
      text: 'You are logged in',
    });

  }

</script>

<template>

  <form @submit.prevent="onSubmit">

    <fieldset>
      <label for="email">Email</label>
      <input v-model="inputEmail" type="email" name="email" id="email">
    </fieldset>

    <fieldset>
      <label for="password">Password</label>
      <input v-model="inputPassword" type="password" name="password" id="password">
    </fieldset>

    <button type="submit">Login</button>

  </form>

  <vue3-snackbar bottom right :duration="4000"></vue3-snackbar>

</template>

<style scoped>

  @reference 'tailwindcss';

  form {
    @apply bg-white flex flex-col gap-6 p-8 rounded-lg shadow-gray-100 shadow-md;
  }

  form fieldset {
    @apply flex flex-col;
  }

  form label {
    @apply font-bold mb-2 text-gray-600 text-sm;
  }

  form input {
    @apply bg-gray-50 border border-gray-100 p-2 rounded-lg shadow-gray-100 shadow-md;
  }

  button[type='submit'] {
    @apply bg-amber-300 font-bold inset-shadow-sm py-3 px-4 rounded-lg shadow-gray-100 shadow-md text-sm text-white;
  }

  button[type='submit']:hover {
    @apply bg-amber-400;
  }

</style>