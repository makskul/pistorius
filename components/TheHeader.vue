<!-- components/Header.vue -->
<template>
  <header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
    <nav class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-xl font-bold">Pistorius</NuxtLink>
      <div>
        <NuxtLink to="/" class="px-4 py-2 hover:bg-blue-700 rounded">Главная</NuxtLink>
        <NuxtLink to="/lections" class="px-4 py-2 hover:bg-blue-700 rounded">Лекции</NuxtLink>
        <NuxtLink to="/lections/add" class="px-4 py-2 hover:bg-blue-700 rounded">Додати Викладача</NuxtLink>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>
