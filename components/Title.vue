<template>
  <div class="bg-cool-400 py-20 px-4 text-center mb-20">
    <h1 class="text-5xl font-bold text-white">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
