<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
      <items-card v-for="(item, index) in paginatedItems" :key="index" :item="item" />
    </div>
    <div class="flex justify-center mt-4 my-3">
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="bg-blue-500 text-white px-4 py-2 mx-1 rounded"
        :class="{ 'bg-blue-700': currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const items = Array.from({ length: 20 }, (v, k) => ({ title: `Card ${k + 1}`, description: `Description for card ${k + 1}` }))

const currentPage = ref(1)
const itemsPerPage = 8

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return items.slice(start, end)
})

const totalPages = Math.ceil(items.length / itemsPerPage)

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value += 1
  }
}
const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages) {
    currentPage.value = page
  }
}
</script>
