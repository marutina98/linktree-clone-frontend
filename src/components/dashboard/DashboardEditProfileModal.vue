<script setup lang="ts">

  import { computed, inject, ref, useTemplateRef } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { useEventListener } from '@vueuse/core';

  import { getCurrentModal } from 'jenesius-vue-modal';

  // Interfaces and Types

  import type { Ref } from 'vue';
  import type { IAuthenticationStore } from '@/interfaces/authentication-store.interface';
  import type { IAuthenticationRequest } from '@/interfaces/authentication-request.interface';

  // Services

  import { apiService } from '@/services/api.service';
  import { helperService } from '@/services/helper.service';

  const snackbar = useSnackbar();
  const authenticationStore = inject('authentication') as IAuthenticationStore;

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
  const inputPicture: Ref<string|null> = ref(null);

  const inputPassword = ref('');
  const inputConfirmPassword = ref('');

  // If the checkbox is true
  // the user has decided to change password

  const checkPassword = ref(false);
  const getCheckPassword = computed(() => checkPassword.value);

  // @todo: add picture

  // Form onSubmit

  const onSubmit = async () => {

    const data: [string, string][] = [];

    const isNameSame = inputName.value === user.value.profile.name;
    const isEmailSame = inputEmail.value === user.value.email;
    const isBiographySame = inputBiography.value === user.value.profile.biography;

    if (!isNameSame) data.push(['name', inputName.value]);
    if (!isEmailSame) data.push(['email', inputEmail.value]);

    if (!isBiographySame) {
      const biography = helperService.sanitizeBiography(inputBiography.value);
      data.push(['biography', biography]);
    }

    if (getCheckPassword) {
      data.push(['password', inputPassword.value]);
    }

    // If the user has uploaded a picture
    // send it

    if (inputPicture.value) data.push(['picture', inputPicture.value]);

    const request = await apiService.updateProfile(Object.fromEntries(data));

    if (request.ok) {
      
      const response = await request.json();

      authenticationStore.setToken((response as IAuthenticationRequest).token);
      authenticationStore.setUser(response);

      snackbar.add({
        type: 'success',
        text:'You have now updated your profile.'
      });

      // Close modal if successfull

      const modal = getCurrentModal();
      modal?.close();

      } else {
      snackbar.add({
        type: 'error',
        text: 'Could not updated your profile. Try again.',
      });

    }

  }

  // Template Refs

  const form = useTemplateRef<HTMLFormElement>('form');
  const formInputName = useTemplateRef<HTMLInputElement>('name');
  const formInputEmail = useTemplateRef<HTMLInputElement>('email');
  const formInputBiography = useTemplateRef<HTMLInputElement>('biography');
  const submitBtn = useTemplateRef<HTMLButtonElement>('submitBtn');
  const formInputPassword = useTemplateRef<HTMLInputElement>('password');
  const formInputConfirmPassword = useTemplateRef<HTMLInputElement>('confirm-password');

  // @todo: add picture

  // Validate Form

  useEventListener(form, 'input', (_: Event) => {

    const _errors: string[] = [];

    const nameValidityStatus = helperService.isOnlyLettersAndSpaces(inputName.value);
    const emailValidityStatus = helperService.isEmailValid(inputEmail.value);

    const biography = helperService.sanitizeBiography(inputBiography.value);
    const biographyValidityStatus = helperService.isValidBiography(biography);

    // @todo: add picture

    // Add errors to _errors
    // make errors.value equal to _errors

    if (!nameValidityStatus) _errors.push('Name must only consists of letters and spaces');
    if (!emailValidityStatus) _errors.push('Email is not valid.');
    if (!biographyValidityStatus) _errors.push('Biography length must be between 0 and 255.');

    const statuses = [emailValidityStatus, nameValidityStatus, biographyValidityStatus];

    // If the user has decided to change password

    if (getCheckPassword) {

      console.log(formInputPassword, formInputConfirmPassword);

      const passwordValidityStatus = helperService.isPasswordValid(inputPassword.value);
      const confirmPasswordValidityStatus = helperService.isPasswordValid(inputConfirmPassword.value);
      const passwordsAreEqual = inputPassword.value === inputConfirmPassword.value;

      if (!confirmPasswordValidityStatus) _errors.push('Confirmation password must be at least 8 characters long.');
      if (!passwordsAreEqual) _errors.push('Passwords must be equal.');

      formInputPassword.value?.setAttribute('aria-invalid', JSON.stringify(!passwordValidityStatus));
      formInputConfirmPassword.value?.setAttribute('aria-invalid', JSON.stringify(!confirmPasswordValidityStatus));

      statuses.push(passwordValidityStatus, passwordsAreEqual)

    }

    errors.value = _errors;

    // Set attribute aria-invalid if
    // email and/or password are invalid

    formInputName.value!.setAttribute('aria-invalid', JSON.stringify(!nameValidityStatus));
    formInputEmail.value!.setAttribute('aria-invalid', JSON.stringify(!emailValidityStatus));
    formInputBiography.value!.setAttribute('aria-invalid', JSON.stringify(!biographyValidityStatus));

    // Disabled the button if invalid
    // if all statuses are invalid, the button is invalid

    submitBtn.value!.disabled = !(statuses.every(e => e === true));

  });

  // Picture
  // Convert Image when uploaded

  const onFileUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0] as File;
    const base64 = await helperService.convertImageToBase64(file) as string;
    inputPicture.value = base64;
  }

</script>

<template>    
  <form ref="form" @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Name</label>
      <input ref="name" v-model="inputName" type="text" name="name" id="name">
    </fieldset>
    
    <fieldset>
      <label for="biography">Biography</label>
      <input ref="biography" v-model="inputBiography" type="text" name="biography" id="biography">
    </fieldset>

    <fieldset>
      <label for="email">Email</label>
      <input ref="email" v-model="inputEmail" type="email" name="email" id="email">
    </fieldset>

    <fieldset>
      <label for="picture">Picture</label>
      <input ref="picture" @change="onFileUpload" accept="image/*" type="file" name="picture" id="picture">
    </fieldset>

    <!-- @todo: add password -->

    <fieldset class="checkbox">
      <input ref="check-password" v-model="checkPassword" type="checkbox" name="check-password" id="check-password">
      <label for="check-password">Change Password</label>
    </fieldset>    

    <fieldset :class="{ 'hidden': !getCheckPassword }">
      <label for="password">Password</label>
      <input ref="password" v-model="inputPassword" type="password" name="password" id="password" min="8" required>
    </fieldset>

    <fieldset :class="{ 'hidden': !getCheckPassword }">
      <label for="confirm-password">Confirm Password</label>
      <input ref="confirm-password" v-model="inputConfirmPassword" type="password" name="confirm-password" id="confirm-password" min="8" required>
    </fieldset>

    <ul v-if="errors.length > 0" class="errors">
      <li class="error" v-for="error of errors">{{ error }}</li>
    </ul>

    <button ref="submitBtn" type="submit">Edit Profile</button>
  </form>
</template>

<style scoped>

  @reference 'tailwindcss';

  form {
    @apply bg-white flex flex-col gap-6 p-8 rounded-lg shadow-gray-100 shadow-md;
  }

  form fieldset {
    @apply flex;
  }

  form fieldset:not(.checkbox) {
    @apply flex-col;
  }

  form fieldset.checkbox {
    @apply flex flex-row gap-2 items-center;
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

  .hidden {
    @apply hidden;
  }

</style>