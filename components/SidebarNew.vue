<template>
  <div class="fixed top-0 left-0 w-1/3 h-full bg-white shadow-lg p-6 overflow-auto z-50">
    <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? 'Редагувати дані' : 'Створити викладача' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <UFormGroup label="Ім'я Фамілія" name="fio">
          <UInput v-model="teacher.name" />
        </UFormGroup>
      </div>
      <div class="mb-4">
        <UFormGroup label="Про викладача" name="description">
          <UTextarea v-model="teacher.description" />
        </UFormGroup>
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

      <div v-for="(date) in teacher.dates" :key="date" class="mb-4 border p-4 rounded">
        <div class="flex justify-between items-center mb-4">
          <p class="font-semibold">{{ date }}</p>
          <button type="button" @click="removeDate(date)" class="text-red-500 hover:text-red-700">Видалити</button>
        </div>
        <div class="flex">
          <div class="mb-2 mr-2">
            <UFormGroup label="Початок" name="startTime">
              <UInput type="time" v-model="teacher.lectures[date].startTime" />
            </UFormGroup>
          </div>
          <div class="mb-2 mr-2">
            <UFormGroup label="Початок" name="endTime">
              <UInput type="time" v-model="teacher.lectures[date].endTime" />
            </UFormGroup>
          </div>
          <div class="mb-2">
            <UFormGroup label="Ціна" name="price">
              <UInput v-model="teacher.lectures[date].price" />
            </UFormGroup>
          </div>
        </div>
        <div class="mb-2">
          <UFormGroup label="Тип лекціі" name="type">
            <USelect v-model="teacher.lectures[date].type" :options="lecturesTypes" />
          </UFormGroup>
        </div>
      </div>
      <br/>
      <div class="flex items-center justify-between mt-2">
        <UButton type="submit">
          {{ isEditMode ? 'Зберегти' : 'Створити' }}
        </UButton>
        <UButton color="green" variant="outline" @click="closeSidebar">Закрити</UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLecturesStore } from '@/stores/Lectures'
import { format } from 'date-fns'
import type { Lecture } from '~/types'
import { lecturesTypes } from "~/mock";

const route = useRoute()
const router = useRouter()
const lecturesStore = useLecturesStore()

const teacher = ref({
  name: '',
  description: '',
  dates: [] as string[],
  lectures: {} as Record<string, { startTime: string, endTime: string, price: number, type: string }>
})

const isEditMode = computed(() => route.path.includes('/edit'))
const dateInput = ref<string>('')
const date = ref(new Date())
const maxLecturesExceeded = computed(() => teacher.value.dates.length > 10)

const addDate = () => {
  const formatedDate = format(date.value, 'dd-MM-yyy')

  if (!teacher.value.dates.includes(formatedDate) && teacher.value.dates.length < 10) {
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

const closeSidebar = () => {
  router.push('/lections')
}

const handleSubmit = () => {
  if (isEditMode.value) {
    lecturesStore.updateTeacher(teacher.value)
  } else {
    lecturesStore.addTeacher(teacher.value)
  }
  closeSidebar()
}

onMounted(() => {
  if (isEditMode.value) {
    const id = route.params.id as string
    const existingTeacher: any = lecturesStore.teachers.find(teacher => teacher.id === id)

    if (existingTeacher) {
      const newObj = existingTeacher.lectures.reduce((acc: any, item: Lecture) => {
        acc[item.date] = item
        return acc
      }, {})
      existingTeacher.lectures = JSON.parse(JSON.stringify(newObj))
      teacher.value = JSON.parse(JSON.stringify(existingTeacher))
      teacher.value.dates = JSON.parse(JSON.stringify(Object.keys(existingTeacher.lectures)))
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
