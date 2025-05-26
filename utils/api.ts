import { SUPPORT_CHAINS } from '@/config/network'
import { isPROD } from '@/constants'
import { DomainRef } from '@/hooks/useConfigDomain'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const api: { [k: string]: AxiosInstance } = {}

const instance = (chainId: number) => {
  const chain = SUPPORT_CHAINS.find((item) => chainId == item.id)!
  const baseurl = isPROD || !chain.testnet ? `https://api.${DomainRef.value}` : `https://beta-api.${DomainRef.value}`
  if (!api[baseurl]) {
    api[baseurl] = axios.create({
      baseURL: baseurl,
      timeout: 10000,
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
  if (url.startsWith('/auth')) {
    const token = localStorage.getItem('earlyaccess-token')
    if (!token) throw 'Need token'
    config.headers = { ...(config.headers || {}), Authorization: token }
  }
  const res = await instance(chainId).get<Res<T>>(url, {
    ...config,
    params: params,
  })
  console.info('res:', res?.data)
  if (res?.data?.code !== 200) throw res.data
  return res.data.data
}

export async function post<T>(chainId: number, url: `/${string}`, data: any = {}, config: AxiosRequestConfig = {}) {
  if (url.startsWith('/auth')) {
    const token = localStorage.getItem('earlyaccess-token')
    if (!token) throw 'Need token'
    config.headers = { ...(config.headers || {}), Authorization: token }
  }
  const res = await instance(chainId).post<Res<T>>(url, data, config)
  if (res?.data?.code !== 200) throw res.data
  return res.data.data
}

// export function put(url: string, data: any) {
//   return instance.put(url, data);
// }
const apis = {
  get,
  post,
  // put,
}
export default apis
