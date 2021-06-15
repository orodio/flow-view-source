import {useAccountContracts} from "./use-account-contracts"
export {refetch} from "./use-account-contracts"

export function useAccountContractsLabels(address) {
  var contracts = useAccountContracts(address)
  return Object.keys(contracts ?? {})
}
