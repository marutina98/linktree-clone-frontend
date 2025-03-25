<script setup lang="ts">

  import { computed, inject } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { getCurrentModal } from 'jenesius-vue-modal';

  import { apiService } from '@/services/api.service';

  // Interfaces & Types

  import type { StoreGeneric } from 'pinia';

  const props = defineProps({

    id: {
      type: Number,
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

  const id = computed(() => props.id);

  const authenticatedStore = inject('authentication') as StoreGeneric;
  const snackbar = useSnackbar();

  const modal = getCurrentModal();

  const deleteLink = async (id: number) => {

    const request = await apiService.deleteLink(id);
    
    if (request.ok) {

      const userRequest = await apiService.getAuthenticatedUser();

      snackbar.add({
        type: 'success',
        text: `Link with id ${id} was deleted.`,
      });
      
      if (userRequest.ok) {

        const userResponse = await userRequest.json();
        authenticatedStore.setUser(userResponse);

      }

      modal?.close();

    } else {

      snackbar.add({
        type: 'error',
        text: `Link with id ${id} could not be deleted.`,
      });

    }

  }

</script>

<template>
  Delete Link {{ id }}
</template>

<style scoped>

</style>