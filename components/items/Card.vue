<template>
  <div class="border p-4 hover:bg-gray-100 transition duration-300">
    <div class="flex justify-end mb-1.5">
      <button @click=handleDelete(item.id) class="py-1 px-2 bg-red-500 text-white text-sm rounded-md mr-1">Видалити</button>
      <button @click=handleEdit(item.id) class="py-1 px-2 bg-green-500 text-white text-sm rounded-md">Редагувати</button>
    </div>
    <h2 class="text-lg font-bold mb-2">{{ item.name }}</h2>
    <p>{{ item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {useLecturesStore} from "~/stores/Lectures";

const router = useRouter()
defineProps({
  item: {
    type: Object,
    required: true
  }
})

const handleEdit = (id: string) => {
  router.push(`/lections/edit/${id}`)
}

const handleDelete = (id: string) => {
  useLecturesStore().deleteTeacher(parseInt(id))
}
</script>
