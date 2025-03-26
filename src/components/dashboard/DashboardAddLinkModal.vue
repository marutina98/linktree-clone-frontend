<script setup lang="ts">

  import { inject, useTemplateRef } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { getCurrentModal } from 'jenesius-vue-modal';

  import { apiService } from '@/services/api.service';

  // Interfaces & Types

  import type { StoreGeneric } from 'pinia';
  import type { ILinkRequest } from '@/interfaces/link-request.interface';

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

  const formRef = useTemplateRef('form');
  const submitBtnRef = useTemplateRef('submit-btn');

  const onSubmit = () => {
    console.log('Submit');
  }

</script>

<template>
  <form ref="form" @submit.prevent="onSubmit">
    <button ref="submit-btn" type="submit"></button>
  </form>
</template>

<style scoped>

</style>