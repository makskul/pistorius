<template>
  <div class="container mx-auto p-4">
    <h3 class="text-lg font-bold mb-4">Фильтр за ціною</h3>
    <URange
      :min=minPrice
      :max=maxPrice
      v-model="filterValue"
      class="mb-4"
    />
    <div class="flex justify-between text-sm">
      <span>Min: {{ minPrice }}</span>
      <span>Max: {{ maxPrice }}</span>
    </div>
    <button @click="applyFilter" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Применить</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLecturesStore } from '~/stores/Lectures'


const lecturesStore = useLecturesStore()
const minPrice = computed(() => lecturesStore.getMinPrice())
const maxPrice = computed(() => lecturesStore.getMaxPrice())
const filterValue = ref(minPrice.value)

const applyFilter = () => {
  // Logic to apply the filter
  // You can emit an event or update a state with the selected price range
  console.log('Price range selected:', filterValue)
  // Emit the selected price range
  // emit('filter-updated', priceRange.value)
}
</script>
<style lang="scss"></style>
