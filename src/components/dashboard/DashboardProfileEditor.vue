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
        <div class="profile-picture">
          <img :src="user.profile.picture" :alt="user.profile.name">
          <span> {{ user.profile.name }}</span>
        </div>
        <button class="profile-edit-btn">Edit Profile</button>
      </header>
    </template>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile {
    @apply flex items-center justify-center;
  }

  .profile-header {
    @apply flex flex-col items-center justify-center w-full;
  }

  .profile-picture img {
    @apply border-8 border-white ring-2 ring-gray-100 rounded-full max-w-36;
  }

</style>