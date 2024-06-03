import {useLecturesStore} from "~/stores/Lectures";
import {useLecturesInit} from "~/modules/10.api/runtime/composables/useLecturesInit";
import type {Teacher} from "~/types";

export default defineNuxtPlugin( {
  setup: async (nuxtApp) => {
    const lecturesStore = useLecturesStore()

    try {
      const { data } = await useLecturesInit().fetch()

      lecturesStore.initTeachersList(JSON.parse(data) as Teacher[])
    } catch (error) {
      console.error('Failed to fetch lectures:', error)
    }
  }
})
