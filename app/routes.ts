import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { tabToSearchParams } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Address, isAddressEqual } from 'viem'

export function toBVault(r: ReturnType<typeof useRouter>, vault?: Address, tab?: string, subTab?: string) {
  if (!vault) return r.push('/b-vaults')
  let path = `/b-vaults?vault=${vault}`
  tab && (path += `&tab=${tabToSearchParams(tab)}`)
  subTab && (path += `&subtab=${tabToSearchParams(subTab)}`)
  r.push(path)
}

export function toLVault(r: ReturnType<typeof useRouter>, vault?: Address, tab?: string) {
  if (!vault) return r.push('/l-vaults')
  let path = `/l-vaults?vault=${vault}`
  tab && (path += `&tab=${tabToSearchParams(tab)}`)
  r.push(path)
}

export function toLntVault(r: ReturnType<typeof useRouter>, vault?: Address, tab?: string) {
  if (!vault) return r.push('/lnt/vaults')
  const vc = LNTVAULTS_CONFIG.find((item) => item.vault === vault)
  if (!vc) return r.push('/lnt/vaults')
  // if lvt to lvt path
  let path = `${vc.isLVT ? '/lvt' : '/lnt/vaults'}?vault=${vault}`
  tab && (path += `&tab=${tabToSearchParams(tab)}`)
  r.push(path)
}
