<script setup lang="ts">

  import { computed, inject } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { apiService } from '@/services/api.service';
  import { openModal } from 'jenesius-vue-modal';

  import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

  import type { StoreGeneric } from 'pinia';
  import type { ILink } from '@/interfaces/link.interface';
  import type { ILinkRequest } from '@/interfaces/link-request.interface';

  import DashboardEditLinkModal from './DashboardEditLinkModal.vue';
  import DashboardDeleteLinkModal from './DashboardDeleteLinkModal.vue';

  const authenticatedStore = inject('authentication') as StoreGeneric;

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => {

    const _user = props.user;

    if (_user) {
      _user.links = sortLinks(_user.links);
    }
    
    return _user;

  });

  // The Links must be arranged by their order.

  const snackbar = useSnackbar();

  // To move into helpers.service.ts

  const getIconChar = (icon: string) => {
    return String.fromCodePoint(parseInt(icon, 16));
  }

  const getMaxOrder = (links: ILink[]) => {
    return Math.max(...links.map(link => link.order));
  }

  // @todo: moveLinkDown and moveLinkUp
  // need to be streamlined

  const moveLinkDown = async (id: number) => {

    const request = await apiService.moveLinkDown(id);

    if (request.ok) {

      const updateStatus = await updateUser();

      // Snackbar Text and Type
      // change if the update status is true or false

      if (updateStatus) {

        snackbar.add({
          text: 'Link order was updated.',
          type: 'success'
        });

      } else {

        snackbar.add({
          text: 'Link order could not be updated.',
          type: 'error'
        });

      }

    } else {

      snackbar.add({
        text: 'Link order could not be updated.',
        type: 'error'
      });

    }

  }

  const moveLinkUp = async (id: number) => {

    const request = await apiService.moveLinkUp(id);

    if (request.ok) {

    const updateStatus = await updateUser();

      // Snackbar Text and Type
      // change if the update status is true or false

      if (updateStatus) {

        snackbar.add({
          text: 'Link order was updated.',
          type: 'success'
        });

      } else {

        snackbar.add({
          text: 'Link order could not be updated.',
          type: 'error'
        });

      }

      } else {

      snackbar.add({
        text: 'Link order could not be updated.',
        type: 'error'
      });

    }

  }

  const updateUser = async () => {

    const request = await apiService.getAuthenticatedUser();

    if (request.ok) {
      const response = await request.json();
      authenticatedStore.setUser(response);
      return true;
    }

    return false;

  }
  
  // Sort Links By their Order

  const sortLinks = (links: ILink[]) => {

    return links.sort((a: ILink, b: ILink) => {
      return a.order - b.order;
    });

  }

  // Edit/Delete Link Modals

  const openDeleteModal = (id: number) => {
    openModal(DashboardDeleteLinkModal, { id });
  }

  const openEditModal = (data: ILinkRequest) => {
    openModal(DashboardEditLinkModal, { data });
  }

</script>

<template>
  <div class="grid">

    <div class="editor">

      <h1 class="editor-header">Editor</h1>

      <div class="editor-content">
  
        <template v-if="user!.links.length > 0">

          <ul class="editor-links">

            <li class="editor-link" v-for="link of user!.links" :key="link.id">

              <span class="editor-link-icon">
                <template v-if="link.icon.length > 0">
                  {{ getIconChar(link.icon) }}
                </template>
              </span>
              
              <a :href="link.url" class="editor-link-anchor">
                {{ link.name }}
              </a>

              <div class="editor-link-buttons">

                <button @click="openDeleteModal(link.id)" class="delete-btn">
                  <TrashIcon class="delete-btn-icon size-6" />
                </button>

                <button @click="openEditModal(link as ILinkRequest)" class="edit-btn">
                  <PencilIcon class="edit-btn-icon size-6" />
                </button>

                <template v-if="link.order > 1">
                  <button @click="moveLinkUp(link.id)" class="position-btn move-up">
                    <ChevronUpIcon class="position-btn-icon size-6" />
                  </button>
                </template>

                <template v-if="link.order < getMaxOrder(user!.links)">
                  <button @click="moveLinkDown(link.id)" class="position-btn move-down">
                    <ChevronDownIcon class="position-btn-icon size-6" />
                  </button>
                </template>

              </div>

            </li>

          </ul>

        </template>

        <template v-else>
          <div class="editor-link">
            No Links were found.
          </div>
        </template>

      </div>

    </div>

    <div class="preview">

      <h1 class="preview-header">Preview</h1>

      <div class="preview-content">
      
        <div class="preview-picture">
          <div :style="{ backgroundImage: `url(${user!.profile.picture})` }"></div>
        </div>

        <template v-if="user!.links.length > 0">

          <ul class="preview-links">

            <li class="preview-link" v-for="link of user!.links" :key="link.id">

              <span class="preview-link-icon">
                <template v-if="link.icon.length > 0">
                  {{ getIconChar(link.icon) }}
                </template>
              </span>
              
              <a :href="link.url" class="preview-link-anchor">
                {{ link.name }}
              </a>

            </li>

          </ul>

        </template>

        <template v-else>
          <div class="preview-link">
            No Links were found.
          </div>
        </template>

      </div>

    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .grid {
    @apply grid grid-cols-2;
  }

  /* EDITOR */

  .editor {
    @apply border-r border-dashed border-gray-200;
  }

  .editor-link-buttons {
    @apply flex flex-row gap-1 ml-1;
  }

  .position-btn,
  .delete-btn,
  .edit-btn {
    @apply cursor-pointer;
  }

  .position-btn-icon,
  .delete-btn-icon,
  .edit-btn-icon {
    @apply aspect-square bg-white font-bold p-1 rounded-full;
  }

  .position-btn:hover .position-btn-icon,
  .delete-btn:hover .delete-btn-icon,
  .edit-btn:hover .edit-btn-icon {
    @apply bg-gray-200;
  }

  /* PREVIEW */

  .preview-picture {
    @apply flex items-center justify-center;
  }

  .preview-picture div {
    @apply border-8 border-white h-42 ring-2 ring-gray-100 rounded-full w-42;
    background-position: center;
    background-size: cover;
  }

  /* EDITOR & PREVIEW */

  .editor-header,
  .preview-header {
    @apply p-4 text-2xl text-center border-b border-dashed border-b-gray-200 uppercase;
  }

  .editor-content,
  .preview-content {
    @apply p-4 flex flex-col gap-4;
  }

  .editor-links,
  .preview-links {
    @apply flex flex-col gap-2;
  }

  .editor-link,
  .preview-link {
    @apply flex justify-between p-2;
  }

  .editor-link:nth-child(odd),
  .preview-link:nth-child(odd) {
    @apply  bg-amber-100;
  }

  .editor-link:nth-child(odd):hover,
  .preview-link:nth-child(odd):hover {
    @apply  bg-amber-200;
  }

  .editor-link:nth-child(even),
  .preview-link:nth-child(even) {
    @apply bg-lime-100;
  }

  .editor-link:nth-child(even):hover,
  .preview-link:nth-child(even):hover {
    @apply  bg-lime-200;
  }

</style>