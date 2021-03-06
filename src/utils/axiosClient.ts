import axios, { AxiosError, AxiosResponse } from 'axios'
import { baseAPI } from '@/app/config'
import { AxiosRequestConfigType } from '@/app/types'
import { store } from '@/app/store'
import { errorAlert } from '@/store/alert/alertSlice';

const axiosClient = axios.create({
  baseURL: baseAPI,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    store.dispatch(errorAlert(error.message)) // Example to use store
    if (error.response?.status === 401) {
      // Handle
    }
    return Promise.reject(error)
  },
)

export function get(path: string) {
  return axiosClient.get(path)
}

export function post(path: string, payload: object): unknown {
  return axiosClient.post(path, payload)
}

export function patch(path: string, payload: object): unknown {
  return axiosClient.patch(path, payload)
}

export function put(path: string, payload: object): unknown {
  return axiosClient.put(path, payload)
}

export function destroy(path: string): unknown {
  return axiosClient.delete(path)
}

export function request(config: AxiosRequestConfigType): unknown {
  return axiosClient.request(config)
}

export default axiosClient
