import type {Teacher} from "~/types";

interface FetchResponse<T> {
  data: T | null
  error: any
}

const createResponse = async<T>(f: Function): Promise<FetchResponse<T>> => {
  const response: FetchResponse<T> = {
    data: null,
    error: null
  }

  try {
    response.data = await f()
  } catch (error) {
    response.error = error
  }

  return response
}

export const useApi = () => {
  const getLectures = (): Promise<FetchResponse<Teacher[]>> => {
    return createResponse(() => $fetch('/api/lectures'))
  }

  return {
    getLectures
  }
}



