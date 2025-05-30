import { useState } from 'react'
import { useDebounce } from 'react-use'

export function useCalcKey(deps: any[], wait: number = 300) {
  const [calcKey, setCalcKey] = useState(deps)
  useDebounce(() => setCalcKey(deps), wait, deps)
  return calcKey
}
