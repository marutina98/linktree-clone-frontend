<script setup lang="ts">

  import { ref, inject, useTemplateRef } from 'vue';
  import { useSnackbar, Vue3Snackbar } from 'vue3-snackbar';
  import { useEventListener } from '@vueuse/core';
  import { apiService } from './../services/api.service';

  import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface';
  import type { IAuthenticationRequest } from '@/interfaces/authentication-request.interface';
  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';
  import { useRouter } from 'vue-router';

  const inputEmail = ref('');
  const inputPassword = ref('');

  const snackbar = useSnackbar();
  const authenticationStore = inject('authentication') as IAuthenticationStore;

  const router = useRouter();

  // Validate Form
  // Button is valid only when valid

  const form = useTemplateRef<HTMLFormElement>('form');
  const submitBtn = useTemplateRef<HTMLButtonElement>('submitBtn');

  useEventListener(form, 'input', (_: Event) => {
    const emailValidityStatus = isEmailValid(inputEmail.value);
    const passwordValidityStatus = isPasswordValid(inputPassword.value);
    submitBtn.value!.disabled = !(emailValidityStatus && passwordValidityStatus);
  });

  const onSubmit = async () => {

    const data: IAuthenticationLoginData = {
      email: inputEmail.value,
      password: inputPassword.value,
    }

    const request = await apiService.login(data);
    const response = await request.json();
    
    if (request.ok) {

      authenticationStore.setToken((response as IAuthenticationRequest).token);

      snackbar.add({
        type: 'success',
        text:'You are now logged in.'
      });

      router.push({
        path: '/'
      });

    } else {
      snackbar.add({
        type: 'error',
        text: 'Could not authenticate. Try Again.',
      });
    }

  }

  const isEmailValid = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  const isPasswordValid = (password: string) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  }

</script>

<template>

  <form ref="form" @submit.prevent="onSubmit">

    <fieldset>
      <label for="email">Email</label>
      <input v-model="inputEmail" type="email" name="email" id="email">
    </fieldset>

    <fieldset>
      <label for="password">Password</label>
      <input v-model="inputPassword" type="password" name="password" id="password">
    </fieldset>

    <button ref="submitBtn" type="submit">Login</button>

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

  button[type='submit']:disabled {
    @apply bg-gray-300 cursor-not-allowed;
  }

</style>