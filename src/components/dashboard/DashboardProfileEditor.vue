<script setup lang="ts">

  import { computed } from 'vue';

  const props = defineProps({
    user: {
      type: [Object, null],
      required: true
    }
  });

  const user = computed(() => props.user);

</script>

<template>
  <div class="grid">

    <div class="editor">
      Editor
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

  .preview {

  }

</style>