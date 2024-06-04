import { defineEventHandler } from 'h3'
import { Teacher } from '~/types/index'

export default defineEventHandler(async (event) => {
  const data: Teacher[] = [
    {
      id: 1,
      name: 'Брендан Ейх',
      description: 'Мощний дядько, без нього не було б цієї платформи',
      lectures: [
        { id: 101, title: 'Лекция 1', description: 'Лекція онлайн', date: '2024-06-01', price: 70, startTime: '', endTime: '', type: '' },
        { id: 102, title: 'Лекция 2', description: 'Лекція по телефону', date: '2024-06-05', price: 120, startTime: '', endTime: '', type: '' },
      ],
    },
    {
      id: 2,
      name: 'Марко Поло',
      description: 'Вчить як краще мандрувати, та розробляти власні футболки',
      lectures: [
        { id: 103, title: 'Лекция 3', description: 'Описание лекции 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '' },
      ],
    },
    {
      id: 3,
      name: 'Доктор Стрейндж',
      description: 'Завжди дивний, іноді ми думаємо, що він під чимось',
      lectures: [
        { id: 103, title: 'Лекция 3', description: 'Описание лекции 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '' },
      ],
    },
    {
      id: 4,
      name: 'Мама Тараса',
      description: 'Виховала найкращого та найвідомішого письменника в Україні, ділиться досвідом на лекціях',
      lectures: [
        { id: 103, title: 'Лекция 3', description: 'Описание лекции 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '' },
      ],
    },
  ]

  return JSON.stringify(data)
})
