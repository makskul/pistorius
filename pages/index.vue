<template>
  <div>
    <home-banner />
    <div class="container mx-auto p-4">
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Викладачі</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <home-teacher-card v-for="teacher in teachers" :key="teacher.id" :teacher="teacher" />
        </div>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Наша платформа - це</h2>
        <p>Можливість вчитись віддалено, та закривати пробіли у цікавих для вас науках.</p>
      </section>
      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Не пропусти нових лекцій, підпишись на повідомлення</h2>
        <home-notifications-block />
      </section>
      <section>
        <h2 class="text-2xl font-bold mb-4">Наші самі нові лекції</h2>
        <home-new-lectures />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLecturesStore } from '../stores/Lectures'

const teachers = useLecturesStore().teachers
</script>
