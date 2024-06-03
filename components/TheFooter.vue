<!-- components/Footer.vue -->
<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto text-center">
      <h2 class="text-xl font-bold">Lections Platform</h2>
      <a
        href="https://github.com/YourGitHubUsername"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-400 hover:text-blue-600"
      >
        GitHub
      </a>
      <p class="mt-2">&copy; {{ currentYear }} - makskul</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

// Получаем текущий год
const currentYear = new Date().getFullYear()
</script>
