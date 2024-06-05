import { useApi } from '~/modules/10.api/runtime/composables/useApi'

export const useLecturesInit = () => {
  const api = useApi()

  const fetch = () => api.getLectures()

  return { fetch }
}
