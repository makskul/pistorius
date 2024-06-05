<template>
  <div class="bg-white p-4 shadow-md">
    <img :src="teacher.photo" alt="teacher photo" class="w-full h-48 object-cover mb-4">
    <h3 class="text-lg font-bold">{{ teacher.name }}</h3>
    <p>{{ teacher.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  teacher: {
    type: Object,
    required: true
  }
})
</script>
