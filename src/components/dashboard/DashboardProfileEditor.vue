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
      <div class="profile-left">
        <img class="profile-picture ":src="user.profile.picture" :alt="user.profile.name">
        <span class="profile-name"> {{ user.profile.name }}</span>
      </div>

      <div class="profile-right">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Est, cum optio aliquid ipsa eaque esse expedita blanditiis
        similique earum reiciendis placeat enim rem nemo assumenda,
        incidunt quam quae voluptatum veniam.
      </div>

      <div class="profile-bottom">
        <button class="profile-edit-btn">Edit Profile</button>
      </div>
    </template>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile {
    @apply gap-4 grid items-center justify-center p-4;
    grid-template-areas: 'left right'
                         'bottom bottom';
  }

  .profile-left {
    @apply flex flex-col gap-4 items-center justify-center w-full;
    grid-area: left;
  }

  .profile-picture {
    @apply border-8 border-white ring-2 ring-gray-100 rounded-full max-w-36;
  }

  .profile-name {
    @apply bg-black bottom-5 left-0 py-1 px-6 rounded-full text-sm text-white;
  }

  .profile-right {
    grid-area: right;
  }

  .profile-bottom {
    @apply flex items-center justify-center;
    grid-area: bottom;
  }

  .profile-edit-btn {
    @apply bg-amber-300 cursor-pointer px-4 py-2 uppercase min-w-16;
  }

</style>