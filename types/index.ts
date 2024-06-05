export interface Lecture {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  price: number
  type: string
  sortType: 'asc' | 'desc'
}

export interface Teacher {
  id: string
  name: string
  description: string
  display: boolean
  lectures: Lecture[]
}
