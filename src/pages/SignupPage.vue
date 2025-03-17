<script setup lang="ts">

  import { ref } from 'vue';

  const inputEmail = ref('');
  const inputPassword = ref('');
  const inputConfirmPassword = ref('');

  const onSubmit = async () => {

  }

</script>

<template>
  <form ref="form" @submit.prevent="onSubmit">

  <fieldset>
    <label for="email">Email</label>
    <input ref="email" v-model="inputEmail" type="email" name="email" id="email" required>
  </fieldset>

  <fieldset>
    <label for="password">Password</label>
    <input ref="password" v-model="inputPassword" type="password" name="password" id="password" min="8" required>
  </fieldset>

  <button ref="submitBtn" type="submit">Login</button>

  </form>
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

  form input:focus {
    @apply outline-2 outline-amber-500;
  }

  form input[aria-invalid='true'] {
    @apply outline-2 outline-red-500;
  }

  button[type='submit'] {
    @apply bg-amber-300 font-bold inset-shadow-sm py-3 px-4 rounded-lg shadow-gray-100 shadow-md text-sm text-white;
  }

  button[type='submit']:hover {
    @apply bg-amber-400;
  }

  button[type='submit']:disabled {
    @apply bg-gray-300 cursor-not-allowed;
  }

</style>