import { defineEventHandler, createError } from 'h3'
import { Teacher } from '~/types/index'

export default defineEventHandler(async (event) => {
  const responseHeaders = event.node.res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const data: Teacher[] = [
    {
      id: 1,
      name: 'Преподаватель 1',
      description: 'Описание преподавателя 1',
      lectures: [
        { id: 101, title: 'Лекция 1', description: 'Описание лекции 1', date: '2024-06-01' },
        { id: 102, title: 'Лекция 2', description: 'Описание лекции 2', date: '2024-06-05' },
      ],
    },
    {
      id: 2,
      name: 'Преподаватель 2',
      description: 'Описание преподавателя 2',
      lectures: [
        { id: 103, title: 'Лекция 3', description: 'Описание лекции 3', date: '2024-06-10' },
      ],
    },
  ]

  // Function to send event data
  const sendEventData = (data: any) => {
    event.node.res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  // Send initial data
  sendEventData(data)
})
