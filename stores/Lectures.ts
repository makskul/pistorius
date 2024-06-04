import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';
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
      const index = this.teachers.findIndex((teacher: Teacher) => teacher.id === updatedTeacher.id)
      if (index !== -1) {
        this.teachers[index] = updatedTeacher
      }
    },

    deleteTeacher(teacherId: number) {
      this.teachers = this.teachers.filter((teacher: Teacher) => teacher.id !== teacherId)
    },

    sortLecturesByPrice() {
      this.teachers.forEach((teacher: Teacher) => {
        teacher.lectures.sort((a, b) => a.price - b.price)
      })
    },

    filterLecturesByPrice(minPrice: number, maxPrice: number) {
      this.teachers.forEach(teacher => {
        teacher.lectures = teacher.lectures.filter(lecture => lecture.price >= minPrice && lecture.price <= maxPrice)
      })
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    },

    setItemsPerPage(count: number) {
      this.itemsPerPage = count
    },

    getCurrentPageLectures(): Teacher[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      const allTeachers = this.teachers.flatMap(teacher => teacher)
      return allTeachers.slice(start, end)
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
    totalLecturesCount(state): number {
      return state.teachers.reduce((total, teacher) => total + teacher.lectures.length, 0)
    },
    totalPages(state): number {
      return Math.ceil(this.totalLecturesCount / state.itemsPerPage)
    }
  }
})
