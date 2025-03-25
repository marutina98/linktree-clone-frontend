<script setup lang="ts">

  import { computed, inject } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { getCurrentModal } from 'jenesius-vue-modal';

  import { apiService } from '@/services/api.service';

  // Interfaces & Types

  import type { StoreGeneric } from 'pinia';
import type { ILinkRequest } from '@/interfaces/link-request.interface';

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

  const data = computed(() => props.data);
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
        text: `Link with id ${id} was updated.`,
      });
      
      if (userRequest.ok) {

        const userResponse = await userRequest.json();
        authenticatedStore.setUser(userResponse);

      }

      modal?.close();

    } else {

      snackbar.add({
        type: 'error',
        text: `Link with id ${id} could not be updated.`,
      });

    }

  }

</script>

<template>
  Edit Link {{ id }}
</template>

<style scoped>

</style>