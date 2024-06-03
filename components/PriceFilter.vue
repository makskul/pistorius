<template>
  <div class="container mx-auto p-4">
    <h3 class="text-lg font-bold mb-4">Фильтр по ценам</h3>
    <URange
      :min="0"
      :max="100"
      :model-value="0"
      class="mb-4"
    />
    <div class="flex justify-between text-sm">
      <span>Min: {{ priceRange[0] }}</span>
      <span>Max: {{ priceRange[1] }}</span>
    </div>
    <button @click="applyFilter" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Применить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const priceRange = ref([0, 1000])
const minPrice = 0
const maxPrice = 1000

const applyFilter = () => {
  // Logic to apply the filter
  // You can emit an event or update a state with the selected price range
  console.log('Price range selected:', priceRange.value)
  // Emit the selected price range
  emit('filter-updated', priceRange.value)
}
</script>

<style scoped>
/* Add any additional styling here if necessary */
</style>
