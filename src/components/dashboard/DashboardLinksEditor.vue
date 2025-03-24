<script setup lang="ts">

  import { computed, inject } from 'vue';
  import { useSnackbar } from 'vue3-snackbar';
  import { apiService } from '@/services/api.service';

  import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';

  import type { StoreGeneric } from 'pinia';
  import type { IUser } from '@/interfaces/user.interface';
  import type { ILink } from '@/interfaces/link.interface';

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

      console.log(authenticatedStore.user);

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

</script>

<template>
  <div class="grid">

    <div class="editor">
  
      <template v-if="user && user.links.length > 0">

        <ul class="editor-links">

          <li class="editor-link" v-for="link of user.links">

            <span class="editor-link-icon">
              <template v-if="link.icon.length > 0">
                {{ getIconChar(link.icon) }}
              </template>
            </span>
            
            <a :href="link.url" class="editor-link-icon-anchor">
              {{ link.name }}
            </a>

            <div class="editor-link-position">

              <template v-if="link.order > 1">
                <button @click="moveLinkUp(link.id)" class="position-btn move-up">
                  <ChevronUpIcon class="position-btn-icon size-6" />
                </button>
              </template>

              <template v-if="link.order < getMaxOrder(user.links)">
                <button @click="moveLinkDown(link.id)" class="position-btn move-down">
                  <ChevronDownIcon class="position-btn-icon size-6" />
                </button>
              </template>

            </div>

          </li>

        </ul>

      </template>

      <template v-else>
        <!-- @todo: no links -->
      </template>

    </div>

    <div class="preview">
      Preview
    </div>

  </div>
</template>

<style scoped>

  @reference 'tailwindcss';

  .grid {
    @apply grid grid-cols-2;
  }

  .editor {
    @apply p-2;
  }

  .editor-links {
    @apply flex flex-col gap-2;
  }

  .editor-link {
    @apply flex justify-between p-2;
  }

  .editor-link:nth-child(even) {
    @apply  bg-amber-100;
  }

  .editor-link:nth-child(even):hover {
    @apply  bg-amber-200;
  }

  .editor-link:nth-child(odd) {
    @apply bg-lime-100;
  }

  .editor-link:nth-child(odd):hover {
    @apply  bg-lime-200;
  }

  .editor-link-position {
    @apply flex flex-row gap-1 ml-1;
  }

  .preview {

  }

  .position-btn {
    @apply cursor-pointer;
  }

  .position-btn-icon {
    @apply aspect-square bg-white font-bold p-1 rounded-full;
  }

  .position-btn:hover .position-btn-icon {
    @apply bg-gray-200;
  }

</style>