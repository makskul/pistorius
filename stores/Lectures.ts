import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { Teacher } from '~/types'

export const useLecturesStore = defineStore('lectures', {
  state: () => ({
    teachers: [] as Teacher[],
    currentPage: 1,
    itemsPerPage: 5
  }),
  actions: {
    initTeachersList(data: Teacher[]) {
      this.teachers = data
    },

    addTeacher(teacher: Teacher) {
      const lectures = Object.values(teacher.lectures)

      const newTeacher = {
        ...teacher,
        id: uuidv4(),
        lectures: lectures.map(lecture => ({
          ...lecture,
          id: uuidv4(),
        })),
      };

      this.teachers.push(newTeacher)
    },

    updateTeacher(updatedTeacher: Teacher) {
      const lectures = Object.values(updatedTeacher.lectures)
      const concatedLecturesObj = {
          ...updatedTeacher,
          lectures: lectures.map(lecture => ({
          ...lecture
        }))
      }
      const index = this.teachers.findIndex((teacher: Teacher) => teacher.id === concatedLecturesObj.id)
      if (index !== -1) {
        this.teachers[index] = concatedLecturesObj
      }
    },

    deleteTeacher(teacherId: string) {
      this.teachers = this.teachers.filter((teacher: Teacher) => teacher.id !== teacherId)
    },

    sortLecturesByPrice(id: string) {
      const index = this.teachers.findIndex((teacher: Teacher) => teacher.id === id)
      const thisTeacher = this.teachers[index]

      if (thisTeacher.lectures.sortType === 'asc' || !thisTeacher.lectures.sortType) {
        thisTeacher.lectures.sortType = 'desc'
        thisTeacher.lectures.sort((a, b) => b.price - a.price)
        return
      }

      thisTeacher.lectures.sortType = 'asc'
      thisTeacher.lectures.sort((a, b) => a.price - b.price)
    },

    filterLecturesByPrice(minPrice: number, maxPrice: number) {
      this.teachers.forEach(teacher => {
        const filterResult = teacher.lectures.filter(lecture => lecture.price >= minPrice && lecture.price <= maxPrice)
        teacher.display = !!filterResult.length
      })
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },

    getCurrentPageLectures(): Teacher[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      const allTeachers = this.teachers.flatMap((teacher) => {
          if (teacher.display) {
            return teacher
          }
        }
      ).filter((element) => element !== undefined)

      return allTeachers.slice(start, end) as Teacher[]
    },

    getMinPrice(): number {
      const allLectures = this.teachers.flatMap(teacher => teacher.lectures)
      return allLectures.reduce((min, lecture) => lecture.price < min ? lecture.price : min, allLectures[0]?.price || 0)
    },

    getMaxPrice(): number {
      const allLectures = this.teachers.flatMap(teacher => teacher.lectures)
      return allLectures.reduce((max, lecture) => lecture.price > max ? lecture.price : max, allLectures[0]?.price || 0)
    }
  },
  getters: {
    totalPages(state): number {
      return Math.ceil(state.teachers.length / state.itemsPerPage)
    }
  }
})
