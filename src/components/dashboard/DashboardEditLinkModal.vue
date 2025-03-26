<script setup lang="ts">

  import { computed, inject, onMounted, ref, useTemplateRef, type Ref } from 'vue';
  import { useEventListener } from '@vueuse/core';

  import { useSnackbar } from 'vue3-snackbar';
  import { getCurrentModal } from 'jenesius-vue-modal';

  // Emoji Picker

  import 'vue3-emoji-picker/css'
  import EmojiPicker from 'vue3-emoji-picker';

  // Service

  import { apiService } from '@/services/api.service';
  import { helperService } from '@/services/helper.service';

  // Interfaces & Types

  import type { StoreGeneric } from 'pinia';
  import type { ILinkRequest } from '@/interfaces/link-request.interface';
  import type { IEmoji } from '@/interfaces/emoji.interface';

  const props = defineProps({

    data: {
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

  const id = computed(() => props.data.id);

  const authenticatedStore = inject('authentication') as StoreGeneric;
  const snackbar = useSnackbar();

  const modal = getCurrentModal();

  const editLink = async (data: ILinkRequest) => {

    const request = await apiService.editLink(data);
    
    if (request.ok) {

      const userRequest = await apiService.getAuthenticatedUser();

      snackbar.add({
        type: 'success',
        text: `Link with id ${data.id} was updated.`,
      });
      
      if (userRequest.ok) {

        const userResponse = await userRequest.json();
        authenticatedStore.setUser(userResponse);

      }

      modal?.close();

    } else {

      snackbar.add({
        type: 'error',
        text: `Link with id ${data.id} could not be updated.`,
      });

    }

  }

  // Form

  const errors: Ref<string[]> = ref([]);

  const inputUrl = ref('');
  const inputName = ref('');

  const formRef = useTemplateRef('form');
  const inputUrlRef = useTemplateRef('input-url-ref');
  const inputNameRef = useTemplateRef('input-name-ref');
  const submitBtnRef = useTemplateRef('submit-btn');

  const currentEmoji: IEmoji = {
    "u": "1f517",
    "r": "1f517",
    "t": "neutral",
    "i": "🔗"
  };

  const selectedEmoji: Ref<IEmoji> = ref(currentEmoji);
  const getEmoji = computed(() => selectedEmoji.value.i);

  const onSubmit = async () => {
   
    const data = {
      id: props.data.id,
      icon: selectedEmoji.value.u,
      name: helperService.sanitizeText(inputName.value),
      url: inputUrl.value
    }

    await editLink(data);

  }

  const onSelectEmoji = (emoji: IEmoji) => {
    selectedEmoji.value = emoji;
  }

  useEventListener(formRef, 'input', (_: Event) => checkStatus());

  const checkStatus = () => {

    const _errors: string[] = [];

    const urlValidityStatus = helperService.isURLValid(inputUrl.value);
    const nameValidityStatus = helperService.isValidText(inputName.value);

    if (!urlValidityStatus) _errors.push('The URL is not valid.');
    if (!nameValidityStatus) _errors.push('The Text is not valid. Max Length 255 characters, Min is 3.');

    errors.value = _errors;

    inputUrlRef.value!.setAttribute('aria-invalid', JSON.stringify(!urlValidityStatus));
    inputNameRef.value!.setAttribute('aria-invalid', JSON.stringify(!nameValidityStatus));

    submitBtnRef.value!.disabled = !(urlValidityStatus && nameValidityStatus);

  }

  const setOriginalValues = () => {
    inputUrl.value = props.data.url;
    inputName.value = props.data.name;
    selectedEmoji.value = helperService.generateEmojiObject(props.data.icon);
  }

  // Set Original Values

  // Check Status of Form after component
  // is mounted

  onMounted(() => {
    setOriginalValues();
    checkStatus();
  });

</script>

<template>

  <form ref="form" @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Text</label>
      <input ref="input-name-ref" v-model="inputName" id="name" name="name" type="text" min="3" max="255" required>
    </fieldset>

    <fieldset>
      <label for="url">Link</label>
      <input ref="input-url-ref" v-model="inputUrl" name="url" type="text" id="url" required>
    </fieldset>

    <fieldset>
      <label for="icon">Icon</label>
      <input ref="input-icon-ref" id="icon" name="icon" type="text" :value="getEmoji" max="1" required readonly>
      <EmojiPicker class="emoji-picker" :native="true" @select="onSelectEmoji" />
    </fieldset>

    <ul v-if="errors.length > 0" class="errors">
      <li class="error" v-for="error of errors">{{ error }}</li>
    </ul>

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
    @apply mt-6;
  }

  .errors {
    @apply list-disc;
  }

  .error {
    @apply text-sm;
  }

</style>