interface Lecture {
  id: number
  title: string
  description: string
  date: string
}

export interface Teacher {
  id: number
  name: string
  description: string
  lectures: Lecture[]
}
