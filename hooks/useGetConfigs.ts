import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Address } from 'viem'

export const AdditionalSupportTokens: { [k: string]: Address } = {
  BERA: '0x6969696969696969696969696969696969696969',
  HONEY: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
  USDC: '0x549943e04f40284185054145c6E4e9568C1D3241',
  BYUSD: '0x688e72142674041f8f6Af4c808a4045cA1D6aC82',
  WETH: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
  iBGT: '0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b',
}

export function useGetAdditionalConfig() {
  return useQuery({
    initialData: {},
    gcTime: 60 * 60 * 1000,
    queryKey: ['getAdditionalConfig'],
    queryFn: async () =>
      axios
        .get<{ [k: Address]: { [k: number]: { token: string; amount: number } } }>('https://raw.githubusercontent.com/zoofiio/configs/refs/heads/main/additional.json')
        .then((res) => res.data),
  })
}
