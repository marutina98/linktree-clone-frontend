<script setup lang="ts">

  import { computed } from 'vue';
  import { openModal } from 'jenesius-vue-modal';

  import type { IUser } from '@/interfaces/user.interface';

  import DashboardEditProfileModal from './DashboardEditProfileModal.vue';

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => props.user as IUser);

  // Open Edit Modal and Pass user to it

  const openEditModal = () => {
    const props = {
      user
    }
    openModal(DashboardEditProfileModal, props)
  };

</script>

<template>

  <div class="wrapper">

    <div class="profile">

      <template v-if="user">
        
        <div class="profile-left">
          <img class="profile-picture ":src="user.profile.picture" :alt="user.profile.name">
        </div>

        <div class="profile-right">
          
          <div class="profile-data">
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

          <button @click="openEditModal" class="profile-edit-btn">Edit Profile</button>

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
    grid-template-areas: 'left right';
  }

  .profile-left {
    @apply flex flex-col gap-4 items-center justify-center;
    grid-area: left;
  }

  .profile-picture {
    @apply border-8 border-white ring-2 ring-gray-100 rounded-full max-w-36;
  }

  .profile-right {
    @apply gap-4 flex flex-col;
    grid-area: right;
  }

  .profile-data {
    @apply gap-2 flex flex-col;
  }

  .profile-info {
    @apply flex flex-row border-b-2 border-amber-300;
  }

  .profile-info-label,
  .profile-info-content {
    @apply py-2 px-4 text-sm;
  }

  .profile-info-label {
    @apply bg-amber-50 font-bold uppercase max-w-1/2;
  }

  .profile-info-content {
    @apply bg-gray-50 w-full;
  }

  .profile-bottom {
    @apply flex items-center justify-center;
    grid-area: bottom;
  }

  .profile-edit-btn {
    @apply bg-amber-50 border-b-2 border-amber-300 cursor-pointer min-w-16 px-8 py-2 rounded-md text-sm uppercase;
  }

  .profile-edit-btn:hover {
    @apply duration-200 ease-in-out scale-110 transition;
  }

</style>