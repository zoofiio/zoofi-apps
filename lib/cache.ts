import { retry } from "es-toolkit"

const cacheMap = new Map<string, { get: () => Promise<any>, promise: Promise<any>, time?: number, data?: any }>()
export async function cacheGet<T>(key: string, getFn: () => Promise<T>, cacheTime: number = 3000) {
    let cache = cacheMap.get(key)
    if (!cache) {
        const doGet = async () => {
            const data = await retry(() => getFn(), { retries: 3, delay: 1000 })
            // cache
            cacheMap.set(key, { ...cache!, time: Date.now(), data })
            return data
        }
        cache = { get: doGet, promise: doGet() }
        cacheMap.set(key, cache)
    }
    if (cache.time && cache.data && (Date.now() - cache.time) < cacheTime) {
        return cache.data as T
    }
    return cache.promise as Promise<T>
}