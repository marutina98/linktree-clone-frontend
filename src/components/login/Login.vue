<script setup lang="ts">

  // Vue and Router

  import { useRouter } from 'vue-router';
  import { useEventListener } from '@vueuse/core';
  import { ref, inject, useTemplateRef } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';

  // Services

  import { apiService } from '@/services/api.service';
  import { helperService } from '@/services/helper.service';

  // Interfaces and Types

  import type { Ref } from 'vue';
  import type { IAuthenticationLoginData } from '@/interfaces/authentication-login-data.interface';
  import type { IAuthenticationRequest } from '@/interfaces/authentication-request.interface';
  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';

  // Form

  const inputEmail = ref('');
  const inputPassword = ref('');

  const errors: Ref<string[]> = ref([]);

  const snackbar = useSnackbar();
  const authenticationStore = inject('authentication') as IAuthenticationStore;

  const router = useRouter();

  // Validate Form
  // Button is valid only when the form itself is valid

  const form = useTemplateRef<HTMLFormElement>('form');
  const formInputEmail = useTemplateRef<HTMLInputElement>('email');
  const formInputPassword = useTemplateRef<HTMLInputElement>('password');
  const submitBtn = useTemplateRef<HTMLButtonElement>('submitBtn');

  useEventListener(form, 'input', (_: Event) => {

    const _errors: string[] = [];

    const emailValidityStatus = helperService.isEmailValid(inputEmail.value);
    const passwordValidityStatus = helperService.isPasswordValid(inputPassword.value);

    // Add errors to _errors
    // make errors.value equal to _errors

    if (!emailValidityStatus) _errors.push('Email is not valid.');
    if (!passwordValidityStatus) _errors.push('Password must be at least 8 characters long.');

    errors.value = _errors;

    // Set attribute aria-invalid if
    // email and/or password are invalid

    formInputEmail.value!.setAttribute('aria-invalid', JSON.stringify(!emailValidityStatus));
    formInputPassword.value!.setAttribute('aria-invalid', JSON.stringify(!passwordValidityStatus));

    // Disabled the button if invalid

    submitBtn.value!.disabled = !(emailValidityStatus && passwordValidityStatus);

  });

  // Form Submit

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

    <ul v-if="errors.length > 0" class="errors">
      <li class="error" v-for="error of errors">{{ error }}</li>
    </ul>

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

  .errors {
    @apply list-disc;
  }

  .error {
    @apply text-sm;
  }

</style>