<template>
  <div class="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 overflow-auto z-50">
    <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Edit Teacher' : 'Add New Teacher' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Full Name</label>
        <input v-model="teacher.name" id="name" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
        <textarea v-model="teacher.description" id="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Select Dates</label>
        <div class="flex items-center mb-2">
          <input v-model="newDate" type="date" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <button type="button" @click="addDate" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Date</button>
        </div>
        <input v-model="dateInput" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly />
      </div>
      <div v-for="(date, index) in teacher.dates" :key="index" class="mb-4 border p-4 rounded">
        <div class="flex justify-between items-center">
          <p class="font-semibold">{{ date }}</p>
          <button type="button" @click="removeDate(date)" class="text-red-500 hover:text-red-700">Remove</button>
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
          <input v-model="teacher.lectures[date].startTime" type="time" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">End Time</label>
          <input v-model="teacher.lectures[date].endTime" type="time" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input v-model="teacher.lectures[date].price" type="number" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Lecture Type</label>
          <input v-model="teacher.lectures[date].type" type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          <input v-model="teacher.lectures[date].type" type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Save
        </button>
        <button type="button" @click="closeSidebar" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLecturesStore } from '@/stores/lectures'

const route = useRoute()
const router = useRouter()
const lecturesStore = useLecturesStore()

const teacher = ref({
  name: '',
  description: '',
  dates: [] as string[],
  lectures: {} as Record<string, { startTime: string, endTime: string, price: number, type: string }>
})

const isEditMode = computed(() => route.path.startsWith('/edit'))
const newDate = ref<string>('')
const dateInput = ref<string>('')

const addDate = () => {
  if (newDate.value && !teacher.value.dates.includes(newDate.value)) {
    teacher.value.dates.push(newDate.value)
    teacher.value.lectures[newDate.value] = { startTime: '', endTime: '', price: 0, type: '' }
    newDate.value = ''
    updateDateInput()
  }
}

const removeDate = (date: string) => {
  teacher.value.dates = teacher.value.dates.filter(d => d !== date)
  delete teacher.value.lectures[date]
  updateDateInput()
}

const updateDateInput = () => {
  dateInput.value = teacher.value.dates.join(', ')
}

const handleSubmit = () => {
  if (isEditMode.value) {
    lecturesStore.updateTeacher(teacher.value)
  } else {
    lecturesStore.addTeacher(teacher.value)
  }
  router.push('/')
}

const closeSidebar = () => {
  router.push('/')
}

onMounted(() => {
  if (isEditMode.value) {
    const id = route.params.id as string
    const existingTeacher = lecturesStore.teachers.find(teacher => teacher.id === Number(id))
    if (existingTeacher) {
      teacher.value = JSON.parse(JSON.stringify(existingTeacher))
      updateDateInput()
    }
  }
})

watch(() => teacher.value.dates, updateDateInput)
</script>

<style scoped>
/* Add any additional styles here */
</style>
