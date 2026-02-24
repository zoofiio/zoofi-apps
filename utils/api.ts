import { DomainRef } from '@/constants'

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const api: { [k: string]: AxiosInstance } = {}

const instance = () => {
  const baseurl = `https://api.${DomainRef.value}`
  if (!api[baseurl]) {
    api[baseurl] = axios.create({
      baseURL: baseurl,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  return api[baseurl]
}

export type Res<T> = {
  code: number
  message: string
  data: T
}

export async function get<T>(chainId: number, url: `/${string}`, params: any = {}, config: AxiosRequestConfig = {}) {
  const res = await instance().get<Res<T>>(url, {
    ...config,
    params: params,
  })
  console.info('res:', res?.data)
  if (res?.data?.code !== 200) throw res.data
  return res.data.data
}

export async function post<T>(chainId: number, url: `/${string}`, data: any = {}, config: AxiosRequestConfig = {}) {
  const res = await instance().post<Res<T>>(url, data, config)
  if (res?.data?.code !== 200) throw res.data
  return res.data.data
}

const apis = {
  get,
  post,
}
export default apis
