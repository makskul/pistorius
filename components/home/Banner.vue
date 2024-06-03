<template>
  <div class="bg-cover bg-center h-64 text-white flex items-center justify-center" :style="{ backgroundImage: 'url(' + bannerImage + ')' }">
    <h1 class="text-4xl font-bold">Тема лекции</h1>
  </div>
</template>

<script setup>
const bannerImage = 'path/to/your/banner-image.jpg'
</script>

<style scoped>
/* Add any additional styling here */
</style>
