<template>
  <div class="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 overflow-auto z-50">
    <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Редагувати дані' : 'Створити викладача' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Ім'я Фамілія</label>
        <input v-model="teacher.name" id="name" type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Про викладача</label>
        <textarea v-model="teacher.description" id="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Дати лекцій</label>
        <div class="flex items-center mb-2">
          <input v-model="dateInput" @change="handleDateInputChange" type="text" placeholder="Список дат" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readonly />
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton icon="i-heroicons-calendar-days-20-solid" label="" />
            <template #panel="{ close }">
              <DatePicker v-model="date" is-required @close="close" />
            </template>
          </UPopover>
        </div>
        <p v-if="maxLecturesExceeded" class="text-red-500 text-sm mt-2">Завищен ліміт лекцій, максимум 10.</p>
      </div>
      <div v-for="(date, index) in teacher.dates" :key="index" class="mb-4 border p-4 rounded">
        <div class="flex justify-between items-center mb-4">
          <p class="font-semibold">{{ date }}</p>
          <button type="button" @click="removeDate(date)" class="text-red-500 hover:text-red-700">Видалити</button>
        </div>
        <div class="flex">
          <div class="mb-2 mr-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">Початок</label>
            <input v-model="teacher.lectures[date].startTime" type="time" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div class="mb-2 mr-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">Кінець</label>
            <input v-model="teacher.lectures[date].endTime" type="time" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div class="mb-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">Ціна</label>
            <input v-model="teacher.lectures[date].price" type="number" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">Тип Лекціі</label>
          <input v-model="teacher.lectures[date].type" type="text" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {{ isEditMode ? 'Зберегти' : 'Створити' }}
        </button>
        <button type="button" @click="closeSidebar" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Закрити
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLecturesStore } from '@/stores/Lectures'
import { format } from 'date-fns'

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
const dateInput = ref<string>('')
const date = ref(new Date())

const maxLecturesExceeded = computed(() => teacher.value.dates.length > 10)
const showDatepicker = ref(false)

const handleDateSelect = (date: string) => {
  if (!teacher.value.dates.includes(date)) {
    if (teacher.value.dates.length < 10) {
      addDate(date)
    }
    updateDateInput()
  }
}

const addDate = () => {
  const formatedDate = format(date.value, 'd-M-yyy')

  if (!teacher.value.dates.includes(formatedDate)) {
    teacher.value.dates.push(formatedDate)
    teacher.value.lectures[formatedDate] = { date: formatedDate, startTime: '', endTime: '', price: 0, type: '' }
    updateDateInput()
  }
}

const removeDate = (date: string) => {
  teacher.value.dates = teacher.value.dates.filter(d => d !== date)
  delete teacher.value.lectures[date]
  updateDateInput()
}

const handleDateInputChange = () => {
  const dates = dateInput.value.split(',').map(date => date.trim()).filter(date => date)
  if (dates.length <= 10) {
    teacher.value.dates = dates
    teacher.value.lectures = {}
    dates.forEach(date => {
      teacher.value.lectures[date] = { startTime: '', endTime: '', price: 0, type: '' }
    })
  }
  updateDateInput()
}

const updateDateInput = () => {
  dateInput.value = teacher.value.dates.join(', ')
}

const handleSubmit = () => {
  console.log(teacher.value);
  if (isEditMode.value) {
    lecturesStore.updateTeacher(teacher.value)
  } else {
    lecturesStore.addTeacher(teacher.value)
  }
  console.log(lecturesStore.teachers)
  router.push('/lections')
}

const closeSidebar = () => {
  router.push('/lections')
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
watch(() => date.value, addDate)
</script>

<style scoped>
/* Add any additional styles here */
</style>
