<template>
  <UCard class="hover:bg-gray-100 transition duration-300">
    <template #header>
      <div class="flex justify-between">
        <h2 class="text-lg font-bold mb-2">{{ item.name }}</h2>
        <div class="mb-1.5">
          <UButton color="green" @click=handleEdit(item.id) class="mr-1">Редагувати</UButton>
          <UButton color="red" variant="outline" @click=handleDelete(item.id)>Видалити</UButton>
        </div>
      </div>
    </template>
    <div class="flex justify-between">
      <p>{{ item.description }}</p><UButton v-if="item.lectures && item.lectures.length > 1" color="gray" @click="sortHandle(item.id)">sort</UButton>
    </div>
    <br/>
    <UCard class="mb-2" v-for="card in item.lectures">
      <div class="flex justify-between">
        <span>{{ card.date }}: Ціна {{ card.price }}</span>
        <span>{{ card.type }}</span>
        <span>{{ card.startTime }} - {{ card.endTime }}</span>
      </div>
    </UCard>
  </UCard>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLecturesStore } from "~/stores/Lectures";

const router = useRouter()
const store = useLecturesStore()

const sortType = ref('desc')

defineProps({
  item: {
    type: Object,
    required: true
  }
})

const sortHandle = (id: string) => {
  store.sortLecturesByPrice(id)
}
const handleEdit = (id: string) => {
  router.push(`/lections/edit/${id}`)
}

const handleDelete = (id: string) => {
  store.deleteTeacher(id)
}
</script>
