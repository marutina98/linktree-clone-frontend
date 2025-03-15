<script setup lang="ts">

  import { ref } from 'vue';

  const inputEmail = ref('');
  const inputPassword = ref('');
  
  const onSubmit = () => {
    
    

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

</template>

<style scoped>

  @reference 'tailwindcss';

  form {
    @apply bg-white p-8 rounded-xl shadow-lg top-1/2 translate-y-1/2;
  }

  button[type='submit'] {
    @apply bg-white border-b-4 border-b-amber-300 px-4 py-2 uppercase min-w-16;
  }

  button[type='submit']:hover {
    @apply duration-200 ease-in-out scale-125 transition;
  }

</style>