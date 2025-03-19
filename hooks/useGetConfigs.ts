import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Address } from 'viem'

export function useGetAdditionalConfig() {
  return useQuery({
    initialData: {},
    gcTime: 60 * 60 * 1000,
    queryKey: ['getAdditionalConfig'],
    queryFn: async () =>
      axios.get<{ [k: `${Address}_${string}`]: number }>('https://raw.githubusercontent.com/zoofiio/configs/refs/heads/main/additional.json').then((res) => res.data),
  })
}
