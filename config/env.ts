export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ''
export const ANKR_API_KEY = process.env.ANKR_API_KEY || ''

export type TypeENV = 'prod' | 'test'

export const metaEnv = (): TypeENV | undefined => {
    if (typeof window == 'undefined') return undefined
    return document.querySelector<HTMLMetaElement>('meta[name="meta_env"]')?.content as TypeENV
}
export const ENV: TypeENV = (process.env.ENV as any) ?? metaEnv() ?? 'prod'

export const isTEST = ENV == 'test'
export const isPROD = !ENV || ENV == 'prod'
export const isLOCL = process.env.NODE_ENV == 'development'
