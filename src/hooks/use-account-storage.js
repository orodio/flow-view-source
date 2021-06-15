import * as fcl from "@onflow/fcl"
import swr, {mutate} from "swr"

const ZERO = {capacity: 1, used: 1, available: 1}

function key(address) {
  address = fcl.withPrefix(address)
  return `/ACCOUNT/${address}/storage`
}

export function refetch(address) {
  mutate(key(address))
}

export function useAccountStorage(address) {
  address = fcl.withPrefix(address)

  const {data, error} = swr(key(address), async () => {
    if (address == null) return ZERO

    await new Promise(r => setTimeout(r, 1))

    return fcl
      .query({
        args: (arg, t) => [arg(address, t.Address)],
        cadence: `
        pub fun main(addr: Address): {String: UInt64} {
          let acct = getAccount(addr)
          let ret: {String: UInt64} = {}
          ret["capacity"] = acct.storageCapacity
          ret["used"] = acct.storageUsed
          ret["available"] = acct.storageCapacity - acct.storageUsed
          return ret
        }
      `,
      })
      .catch(error => {
        console.error(`useAccountStorage(${address}) --`, error)
        return ZERO
      })
  })

  if (error != null) {
    console.error(`-- FATAL -- useAccountStorage(${address}) --`, error)
    return ZERO
  }

  return data
}
