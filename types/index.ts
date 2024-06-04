export interface Lecture {
  id: number
  title: string
  description: string
  date: string,
  startTime: string,
  endTime: string,
  price: number,
  type: string
}

export interface Teacher {
  id: number
  name: string
  description: string
  lectures: Lecture[]
}
