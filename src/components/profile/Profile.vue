<script setup lang="ts">

  import { computed, onBeforeMount, ref, type Ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { apiService } from '@/services/api.service';
  import { helperService } from '@/services/helper.service';

  import type { IUser } from '@/interfaces/user.interface';

  const route = useRoute();
  const id = route.params.id as string;

  const _user: Ref<IUser|null> = ref(null);
  const user = computed(() => _user.value);

  onBeforeMount(async () => {
    
    const request = await apiService.getUser(id);
    
    if (request.ok) {
      const response = await request.json();
      _user.value = response;
    }

  });

</script>

<template>
 
  <div class="profile">

    <template v-if="user">
      
      <div class="profile-info">
        <div class="profile-picture" :style="{ backgroundImage: `url(${user!.profile.picture})` }"></div>
        <span class="profile-name">{{ user!.profile.name }}</span>
        <p class="profile-biography">{{ user!.profile.biography }}</p>
      </div>

      <template v-if="user!.links.length > 0">

        <ul class="profile-links">

          <li class="profile-link" v-for="link of user!.links" :key="link.id">

            <span class="profile-link-icon">
              <template v-if="link.icon.length > 0">
                {{ helperService.getIconChar(link.icon) }}
              </template>
            </span>
            
            <span class="profile-link-text">
              <a :href="link.url" class="profile-link-anchor">
                {{ link.name }}
              </a>
            </span>

          </li>

        </ul>

      </template>

      <template v-else>
        <div class="profile-link">
          No Links were found.
        </div>
      </template>

    </template>

    <template v-else>
      No User Found
    </template>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .profile {
    @apply p-4 flex flex-col gap-4;
  }

  .profile-info {
    @apply flex flex-col gap-2 items-center justify-center;
  }

  .profile-name {
    @apply text-2xl;
  }

  .profile-biography {
    @apply text-sm;
  }

  .profile-picture {
    @apply border-8 border-white h-42 ring-2 ring-gray-100 rounded-full w-42;
    background-position: center;
    background-size: cover;
  }

  .profile-link {
    @apply flex p-2;
  }

  .profile-link-icon {
    @apply max-w-5;
  }

  .profile-link-text {
    @apply text-center;
    width: calc(100% - (var(--spacing) * 5));
  }

  .profile-content {
    @apply p-4 flex flex-col gap-4;
  }

  .profile-links {
    @apply flex flex-col gap-2;
  }

  .profile-link:nth-child(odd) {
    @apply  bg-amber-100;
  }

  .profile-link:nth-child(odd):hover {
    @apply  bg-amber-200;
  }

  .profile-link:nth-child(even) {
    @apply bg-lime-100;
  }

  .profile-link:nth-child(even):hover {
    @apply  bg-lime-200;
  }

</style>