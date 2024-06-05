<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
      <items-card v-for="(item) in currentLectures" :key="item.id" :item="item" />
    </div>
    <div class="mt-4 flex items-center">
      <UPagination :max="5" :page-count="5" :total="totalPages" :model-value="currentPage" />
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
