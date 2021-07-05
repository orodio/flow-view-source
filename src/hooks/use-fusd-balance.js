import * as fcl from "@onflow/fcl"
import swr, {mutate} from "swr"

const PATH = "/public/fusdBalance"
const TICKER = "FUSD"
const FN_NAME = "useFusdBalance"
const ZERO = "0.00000000"

function key(address) {
  address = fcl.withPrefix(address)
  return `/${TICKER}/${address}/balance`
}

export function refetch(address) {
  mutate(key(address))
}

export function useFusdBalance(address) {
  address = fcl.withPrefix(address)

  const {data, error} = swr(key(address), async () => {
    if (address == null) return `${ZERO} ${TICKER}`

    await new Promise(r => setTimeout(r, 1))
    return fcl
      .query({
        args: (arg, t) => [arg(address, t.Address)],
        cadence: `
          import FungibleToken from 0xFungibleToken

          pub fun main(addr: Address): UFix64 {
            return getAccount(addr)
              .getCapability<&{FungibleToken.Balance}>(${PATH})
              .borrow()?.balance ?? 0.0
          }
        `,
      })
      .catch(error => {
        console.error(`-- ${FN_NAME}(${address}) --`, error)
        return ZERO
      })
      .then(d => `${d} ${TICKER}`)
  })

  if (error != null) {
    console.error(`-- FATAL -- ${FN_NAME}(${address}) --`, error)
    return `${ZERO} ${TICKER}`
  }

  return data
}
