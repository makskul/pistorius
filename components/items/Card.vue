<template>
  <div class="border p-4 hover:bg-gray-100 transition duration-300">
    <h2 class="text-lg font-bold mb-2">{{ item.name }}</h2>
    <p>{{ item.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
