<template>
  <div class="bg-white p-4 shadow-md">
    <h3 class="text-lg font-bold mb-2">Уведомления</h3>
    <div class="flex flex-col">
      <label v-for="topic in topics" :key="topic" class="flex items-center mb-2">
        <input type="checkbox" :value="topic" v-model="selectedTopics" class="mr-2">
        {{ topic }}
      </label>
    </div>
    <button @click="saveNotifications" class="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Сохранить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topics = ['Лекция 1', 'Лекция 2', 'Лекция 3', 'Лекция 4']
const selectedTopics = ref([])

const saveNotifications = () => {
  console.log('Selected topics for notifications:', selectedTopics.value)
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
