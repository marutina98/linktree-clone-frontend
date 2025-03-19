<script setup lang="ts">

  const props = defineProps({

    user: {
      type: Object,
      required: true
    },

    class: {
      type: String,
      required: true,
    },

    modalId: {
      type: String,
      required: true,
    }

  });

</script>

<template>
  Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Consectetur dolores odio a maiores minus, eaque iusto saepe
  reiciendis voluptate sequi. Quaerat quisquam consectetur impedit.
  Nulla, animi! Facere ab repudiandae temporibus!
</template>

<style scoped>

  @reference 'tailwindcss';

</style>