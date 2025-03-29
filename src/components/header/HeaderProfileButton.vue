<script setup lang="ts">

  import type { IUser } from '@/interfaces/user.interface';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => props.user as IUser);

  const router = useRouter();

  const goProfile = () => {
    const path = `/profile/${user.value.id}`;
    router.push({ path });
  }

</script>

<template>
  <button @click="goProfile">Profile</button>
</template>

<style scoped>

  @reference 'tailwindcss';

  button {
    @apply bg-white border-b-4 border-b-amber-300 cursor-pointer px-4 py-2 uppercase min-w-16;
  }

  button:hover {
    @apply duration-200 ease-in-out scale-125 transition;
  }

</style>