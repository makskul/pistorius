<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
      <items-card v-for="(item) in currentLectures" :key="item.id" :item="item" />
    </div>
    <div class="mt-4 flex items-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="p-2 bg-gray-300">Предыдущая</button>
      <button
        v-for="page in totalPages"
        :key="`page-${page}`"
        class="bg-blue-500 text-white px-4 py-2 mx-1 rounded"
        :class="{ 'bg-blue-700': currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="p-2 bg-gray-300">Следующая</button>
    </div>
    <div class="mt-4 flex justify-between items-center">
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import { useLecturesStore } from "~/stores/Lectures";
const route = useRoute();

const lecturesStore = useLecturesStore()
const currentPage = ref(lecturesStore.currentPage)
const currentLectures = computed(() => lecturesStore.getCurrentPageLectures())
// const totalPages = computed(() => lecturesStore.totalPages)
const totalPages = ref(lecturesStore.totalPages)

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    lecturesStore.setCurrentPage(currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    lecturesStore.setCurrentPage(currentPage.value)
  }
}

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    lecturesStore.setCurrentPage(page)
  }
}

watch(() => route.fullPath, () => {
  totalPages.value = lecturesStore.totalPages
})
</script>
