<script setup lang="ts">

  import { computed } from 'vue';
  import type { IUser } from '@/interfaces/user.interface';

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => props.user as IUser);

</script>

<template>

  <div class="profile">

    <template v-if="user">
      <header class="profile-header">
        <img class="profile-picture ":src="user.profile.picture" :alt="user.profile.name">
        <span class="profile-name"> {{ user.profile.name }}</span>
        <button class="profile-edit-btn">Edit Profile</button>
      </header>
    </template>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile {
    @apply flex items-center justify-center p-4;
  }

  .profile-header {
    @apply flex flex-col gap-4 items-center justify-center w-full;
  }

  .profile-picture {
    @apply border-8 border-white ring-2 ring-gray-100 rounded-full max-w-36;
  }

  .profile-name {
    @apply bg-black bottom-5 left-0 py-1 px-6 rounded-full text-sm text-white;
  }

</style>