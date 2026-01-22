
import { isLOCL } from "@/config/env"
import { Address, isAddressEqual } from "viem"
import { useAccount } from "wagmi"

const globalAdmins: Address[] = ['0xFE18Aa1EFa652660F36Ab84F122CD36108f903B6', '0xc56f7063fd6d199ccc443dbbf4283be602d46343', '0x7077323c13af514629C57F89cb4542019402dfBd']
const bvaultsAdmins: Address[] = [...globalAdmins, '0x5C9B9C19ccaC7925157Cc60aCc289e78839c5D70']
export function useShowBvaultAdmin() {
  const { address } = useAccount()
  return isLOCL || (Boolean(address) && bvaultsAdmins.some((item) => isAddressEqual(item as Address, address!)))
}
const lntAdmins = [...globalAdmins, '0xc97B447186c59A5Bb905cb193f15fC802eF3D543']
export function useShowLntVaultAdmin() {
  const { address } = useAccount()
  return isLOCL || (Boolean(address) && lntAdmins.some((item) => isAddressEqual(item as Address, address!)))
}
