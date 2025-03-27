<script setup lang="ts">

  import { computed, onBeforeMount, ref, type Ref } from 'vue';
  import { useRoute } from 'vue-router';

  import { apiService } from '@/services/api.service';

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
    {{ user }}
  </template>

  <template v-else>
    No User Found
  </template>

</template>

<style scoped>

  @reference 'tailwindcss';

</style>