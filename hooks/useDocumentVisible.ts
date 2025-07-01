import { useSyncExternalStore } from 'react'

export function useDocumentVisible() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener('visibilitychange', onChange)
      return () => document.removeEventListener('visibilitychange', onChange)
    },
    () => document.visibilityState == 'visible',
  )
}
