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
const teachers = [
  { id: 4, name: 'Брендан Ейх', photo: 'path/to/photo4.jpg', description: 'Мощний дядько, без нього не було б цієї платформи' },
  { id: 1, name: 'Марко Поло', photo: 'path/to/photo1.jpg', description: 'Вчить як краще мандрувати, та розробляти власні футболки' },
  { id: 2, name: 'Доктор Стрейндж', photo: 'path/to/photo2.jpg', description: 'Завжди дивний, іноді ми думаємо, що він під чимось' },
  { id: 3, name: 'Мама Тараса', photo: 'path/to/photo3.jpg', description: 'Виховала найкращого та найвідомішого письменника в Україні, ділиться досвідом на лекціях' }
];
</script>
