<template>
  <div class="bg-white p-4 shadow-md">
    <h3 class="text-lg font-bold mb-2">Новые лекции</h3>
    <ul>
      <li v-for="lecture in newLectures" :key="lecture.id" class="mb-2">
        <h4 class="font-bold">{{ lecture.title }}</h4>
        <p>{{ lecture.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const newLectures = [
  { id: 1, title: 'Лекция 1', description: 'Описание лекции 1' },
  { id: 2, title: 'Лекция 2', description: 'Описание лекции 2' },
  { id: 3, title: 'Лекция 3', description: 'Описание лекции 3' },
  { id: 4, title: 'Лекция 4', description: 'Описание лекции 4' },
  { id: 5, title: 'Лекция 5', description: 'Описание лекции 5' },
  { id: 6, title: 'Лекция 6', description: 'Описание лекции 6' },
  { id: 7, title: 'Лекция 7', description: 'Описание лекции 7' }
]
</script>

<style scoped>
/* Add any additional styling here */
</style>
