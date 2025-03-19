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

  <div class="wrapper">

    <div class="profile">

      <template v-if="user">
        
        <div class="profile-left">
          <img class="profile-picture ":src="user.profile.picture" :alt="user.profile.name">
        </div>

        <div class="profile-right">
          
          <div class="profile-info profile-name">
            <div class="profile-info-label">Name</div>
            <div class="profile-info-content">{{ user.profile.name }}</div>
          </div>

          <div class="profile-info profile-email">
            <div class="profile-info-label">Email</div>
            <div class="profile-info-content">{{ user.email }}</div>
          </div>

          <div class="profile-info profile-biography">
            <div class="profile-info-label">Biography</div>
            <div class="profile-info-content">{{ user.profile.biography }}</div>
          </div>

        </div>

        <div class="profile-bottom">
          <button class="profile-edit-btn">Edit Profile</button>
        </div>
      </template>

    </div>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .wrapper {
    @apply flex items-center justify-center;
  }

  .profile {
    @apply gap-8 grid items-center justify-center p-4;
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

  .profile-right {
    grid-area: right;
  }

  .profile-info {
    @apply flex flex-row border-b-2 border-amber-300;
  }

  .profile-info-label {
    @apply font-bold;
  }

  .profile-bottom {
    @apply flex items-center justify-center;
    grid-area: bottom;
  }

  .profile-edit-btn {
    @apply bg-amber-300 cursor-pointer px-4 py-2 uppercase min-w-16;
  }

</style>