<script setup lang="ts">

  import { computed } from 'vue';

  import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid';

  import type { IUser } from '@/interfaces/user.interface';
  import type { ILink } from '@/interfaces/link.interface';

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => props.user as IUser);

  // To move into helpers.service.ts

  const getIconChar = (icon: string) => {
    return String.fromCodePoint(parseInt(icon, 16));
  }

  const getMaxOrder = (links: ILink[]) => {
    return Math.max(...links.map(link => link.order));
  }

  const moveLinkDown = (id: number) => {
    console.log('Move Link Down');
  }

  const moveLinkUp = (id: number) => {
    console.log('Move Link Up');
  }

</script>

<template>
  <div class="grid">

    <div class="editor">
  
      <template v-if="user.links.length > 0">

        <ul class="editor-links">

          <li class="editor-link" v-for="link of user.links">

            <span v-if="link.icon.length > 0" class="editor-link-icon">
              {{ getIconChar(link.icon) }}
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

  }

  .editor-links {
    @apply flex flex-col gap-2;
  }

  .editor-link {
    @apply flex bg-amber-100 justify-between p-2;
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