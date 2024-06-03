interface Lecture {
  id: number
  title: string
  description: string
  date: string,
  price: number
}

export interface Teacher {
  id: number
  name: string
  description: string
  lectures: Lecture[]
}
