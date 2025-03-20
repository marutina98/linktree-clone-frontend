<script setup lang="ts">

  import { computed, inject, ref, useTemplateRef } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';

  // Interfaces and Types

  import type { Ref } from 'vue';
  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';
  import { useEventListener } from '@vueuse/core';

  // Services

  import { apiService } from '@/services/api.service';
  import { helperService } from '@/services/helper.service';

  const snackbar = useSnackbar();
  const authenticationStore = inject('authentication') as IAuthenticationStore

  // Props

  const props = defineProps({

    user: {
      type: Object,
      required: true
    },

    class: {
      type: String,
      required: true,
    },

    modalId: {
      type: String,
      required: true,
    }

  });

  const user = computed(() => props.user);

  // Form Errors

  const errors: Ref<string[]> = ref([]);

  // Form Values

  const inputName = ref(user.value.profile.name);
  const inputEmail = ref(user.value.email);
  const inputBiography = ref(user.value.profile.biography);

  // Form onSubmit

  const onSubmit = () => {

  }

  // Template Refs

  const form = useTemplateRef<HTMLFormElement>('form');
  const formInputName = useTemplateRef<HTMLInputElement>('name');
  const formInputEmail = useTemplateRef<HTMLInputElement>('email');
  const formInputBiography = useTemplateRef<HTMLInputElement>('biography');
  const submitBtn = useTemplateRef<HTMLButtonElement>('submitBtn');

  // Validate Form

  useEventListener(form, 'input', (_: Event) => {

    const _errors: string[] = [];

    const nameValidityStatus = helperService.isOnlyLettersAndSpaces(inputName.value);
    const emailValidityStatus = helperService.isEmailValid(inputEmail.value);

    // @todo: biography

    // Add errors to _errors
    // make errors.value equal to _errors

    if (!nameValidityStatus) _errors.push('Name must only consists of letters and spaces');
    if (!emailValidityStatus) _errors.push('Email is not valid.');

    errors.value = _errors;

    // Set attribute aria-invalid if
    // email and/or password are invalid

    formInputName.value!.setAttribute('aria-invalid', JSON.stringify(!nameValidityStatus));
    formInputEmail.value!.setAttribute('aria-invalid', JSON.stringify(!emailValidityStatus));

    // Disabled the button if invalid

    submitBtn.value!.disabled = !(emailValidityStatus && nameValidityStatus);

  });

</script>

<template>    
  <form @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Name</label>
      <input ref="name" v-model="inputName" type="text" name="name" id="name" required>
    </fieldset>
    
    <fieldset>
      <label for="biography">Biography</label>
      <input ref="biography" v-model="inputBiography" type="text" name="biography" id="biography" required>
    </fieldset>

    <fieldset>
      <label for="email">Email</label>
      <input ref="email" v-model="inputEmail" type="email" name="email" id="email" required>
    </fieldset>

    <ul v-if="errors.length > 0" class="errors">
      <li class="error" v-for="error of errors">{{ error }}</li>
    </ul>

    <button ref="submitBtn" type="submit">Login</button>
  </form>
</template>

<style scoped>

  @reference 'tailwindcss';

  .modal {

  }

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