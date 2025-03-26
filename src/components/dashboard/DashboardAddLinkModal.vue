<script setup lang="ts">

  import { computed, inject, ref, useTemplateRef, type Ref } from 'vue';

  import { useSnackbar } from 'vue3-snackbar';
  import { getCurrentModal } from 'jenesius-vue-modal';

  // Emoji Picker

  import 'vue3-emoji-picker/css'
  import EmojiPicker from 'vue3-emoji-picker';

  // Service

  import { apiService } from '@/services/api.service';

  // Interfaces & Types

  import type { StoreGeneric } from 'pinia';
  import type { ILinkRequest } from '@/interfaces/link-request.interface';
  import type { IEmoji } from '@/interfaces/emoji.interface';

  const props = defineProps({

    class: {
      type: String,
      required: true,
    },

    modalId: {
      type: String,
      required: true,
    }

  });

  const authenticatedStore = inject('authentication') as StoreGeneric;
  const snackbar = useSnackbar();

  const modal = getCurrentModal();

  const createLink = async (data: ILinkRequest) => {

    const request = await apiService.createLink(data);
    
    if (request.ok) {

      const userRequest = await apiService.getAuthenticatedUser();

      snackbar.add({
        type: 'success',
        text: 'A new Link was created.',
      });
      
      if (userRequest.ok) {

        const userResponse = await userRequest.json();
        authenticatedStore.setUser(userResponse);

      }

      modal?.close();

    } else {

      snackbar.add({
        type: 'error',
        text: 'A new Link could not be created.',
      });

    }

  }

  // Form

  const inputName = ref('');

  const formRef = useTemplateRef('form');
  const inputNameRef = useTemplateRef('input-name-ref');
  const inputIconRef = useTemplateRef('input-icon-ref');
  const submitBtnRef = useTemplateRef('submit-btn');

  const defaultEmoji: IEmoji = {
    "u": "1f517",
    "r": "1f517",
    "t": "neutral",
    "i": "🔗"
  };

  const selectedEmoji: Ref<IEmoji> = ref(defaultEmoji);
  const getEmoji = computed(() => selectedEmoji.value.i);

  const onSubmit = () => {
    console.log('Submit');
  }

  const onSelectEmoji = (emoji: IEmoji) => {
    selectedEmoji.value = emoji;
  }

</script>

<template>
  <form ref="form" @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Text</label>
      <input ref="input-name-ref" id="name" name="name" type="text" required>
    </fieldset>

    <fieldset>
      <label for="url">Link</label>
      <input ref="input-url-ref" name="url" type="text" id="url" required>
    </fieldset>

    <fieldset>
      <label for="icon">Icon</label>
      <input ref="input-icon-ref" id="icon" name="icon" type="text" :value="getEmoji" max="1" required>
      <EmojiPicker class="emoji-picker" native="true" @select="onSelectEmoji" />
    </fieldset>

    <button ref="submit-btn" type="submit">Submit</button>
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

  .emoji-picker {
    margin-top: 1em;
  }

  .errors {
    @apply list-disc;
  }

  .error {
    @apply text-sm;
  }

</style>