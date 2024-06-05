<template>
  <div class="container p-4 mx-auto w-full text-right">
    <div class="inline-block w-1/4 align-right">
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
      <div class="flex justify-end items-center">
        <UBadge v-if="filterValue > minPrice" color="white" variant="solid" class="mr-2">{{ ` ${ minPrice } - ${ filterValue } ${ mockCurrency } ` }}</UBadge>
        <UButton @click="applyFilter" color="green" class="mt-1">Фільтрувати</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLecturesStore } from '~/stores/Lectures'
import { mockCurrency } from "~/mock";

const store = useLecturesStore()
const minPrice = computed(() => store.getMinPrice())
const maxPrice = computed(() => store.getMaxPrice())
const filterValue = ref(minPrice.value)

const applyFilter = () => {
  // Logic to apply the filter
  // You can emit an event or update a state with the selected price range
  store.filterLecturesByPrice(minPrice.value, filterValue.value)
  console.log('Price range selected:', filterValue)
  // Emit the selected price range
  // emit('filter-updated', priceRange.value)
}
</script>
<style lang="scss"></style>
