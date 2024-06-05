import { defineEventHandler } from 'h3'
import { Teacher } from '~/types/index'

export default defineEventHandler(async (event) => {
  const data: Teacher[] = [
    {
      id: '1',
      name: 'Брендан Ейх',
      description: 'Мощний дядько, без нього не було б цієї платформи',
      display: true,
      lectures: [
        { id: '101', title: 'Лекция 1', date: '2024-06-01', price: 70, startTime: '19:20', endTime: '20:20', type: 'Лекція онлайн', sortType: 'asc' },
        { id: '102', title: 'Лекция 2', date: '2024-06-05', price: 120, startTime: '10:20', endTime: '12:20', type: 'Відеозустріч', sortType: 'asc' },
      ],
    },
    {
      id: '2',
      name: 'Марко Поло',
      description: 'Вчить як краще мандрувати, та розробляти власні футболки',
      display: false,
      lectures: [
        { id: '103', title: 'Лекция 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '', sortType: 'asc' },
      ],
    },
    {
      id: '3',
      name: 'Доктор Стрейндж',
      description: 'Завжди дивний, іноді ми думаємо, що він під чимось',
      display: true,
      lectures: [
        { id: '103', title: 'Лекция 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '', sortType: 'asc' },
      ],
    },
    {
      id: '4',
      name: 'Мама Тараса',
      description: 'Виховала найкращого та найвідомішого письменника в Україні, ділиться досвідом на лекціях',
      display: true,
      lectures: [
        { id: '103', title: 'Лекция 3', date: '2024-06-10', price: 170, startTime: '', endTime: '', type: '', sortType: 'asc' },
      ],
    },
  ]

  return JSON.stringify(data)
})
