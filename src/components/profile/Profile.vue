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
 
  <template v-if="user">
    
    <div class="profile">
      
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

    </div>

  </template>

  <template v-else>
    No User Found
  </template>

</template>

<style scoped>

  @reference 'tailwindcss';

</style>