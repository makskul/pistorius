import { defineEventHandler } from 'h3'
import { Teacher } from '~/types/index'

export default defineEventHandler(async (event) => {
  const data: Teacher[] = [
    {
      id: 1,
      name: 'Петро Штурман',
      description: 'Описание преподавателя 1',
      lectures: [
        { id: 101, title: 'Лекция 1', description: 'Лекція онлайн', date: '2024-06-01', price: 70 },
        { id: 102, title: 'Лекция 2', description: 'Лекція по телефону', date: '2024-06-05', price: 120 },
      ],
    },
    {
      id: 2,
      name: 'Петро Скачкевич',
      description: 'Описание преподавателя 2',
      lectures: [
        { id: 103, title: 'Лекция 3', description: 'Описание лекции 3', date: '2024-06-10', price: 170 },
      ],
    },
  ]

  return JSON.stringify(data)
})
