<template>
  <div>
    <home-banner />
    <div class="container mx-auto p-4">
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Преподаватели</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <home-teacher-card v-for="teacher in teachers" :key="teacher.id" :teacher="teacher" />
        </div>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">О нас</h2>
        <p>Короткий текст о сайте или компании.</p>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Уведомления</h2>
        <home-notifications-block />
      </section>
      <section>
        <h2 class="text-2xl font-bold mb-4">Новые лекции</h2>
        <home-new-lectures />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const teachers = [
  { id: 1, name: 'Преподаватель 1', photo: 'path/to/photo1.jpg', description: 'Описание преподавателя 1' },
  { id: 2, name: 'Преподаватель 2', photo: 'path/to/photo2.jpg', description: 'Описание преподавателя 2' },
  { id: 3, name: 'Преподаватель 3', photo: 'path/to/photo3.jpg', description: 'Описание преподавателя 3' },
  { id: 4, name: 'Преподаватель 4', photo: 'path/to/photo4.jpg', description: 'Описание преподавателя 4' }
];
</script>
