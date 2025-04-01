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
  
  const deny = () => {
    modal?.close();
  }

  const confirm = async (id: number) => {
    await deleteLink(id);
  }

</script>

<template>
  <div class="modal">

    <div class="modal-text">
      Are you sure you want to delete this element ?
    </div>

    <div class="modal-buttons">
      <button @click="deny" class="deny-btn">No</button>
      <button @click="confirm(id)" class="confirm-btn">Yes</button>
    </div>

  </div>
</template>

<style scoped>

  @reference 'tailwindcss';

  .modal {
    @apply bg-white flex flex-col drop-shadow-md gap-2 p-2 rounded-sm;
  }

  .modal-text {

  }

  .modal-buttons {
    @apply gap-2 grid grid-cols-2;
  }

  .deny-btn,
  .confirm-btn {
    @apply border-2 cursor-pointer py-2 px-4 text-sm uppercase;
  }

  .deny-btn {
    @apply border-red-400 text-red-600;
  }

  .deny-btn:hover {
    @apply bg-red-400 text-white;
  }

  .confirm-btn {
    @apply border-emerald-400 text-emerald-600;
  }

  .confirm-btn:hover {
    @apply bg-emerald-400 text-white;
  }

</style>