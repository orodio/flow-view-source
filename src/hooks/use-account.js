import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"

export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"

// this is gross need to fix this in fcl
function ready() {
  return new Promise(resolve => {
    setTimeout(resolve, 1)
  })
}

async function fetchAccount(address) {
  await ready()
  return address == null ? Promise.resolve(null) : fcl.account(address)
}

export const data = atomFamily({
  key: "ACCOUNT::DATA",
  default: selectorFamily({
    key: "ACCOUNT::PRIME",
    get: address => async () => fetchAccount(address),
  }),
})

export const fsm = atomFamily({
  key: "ACCOUNT::FSM",
  default: IDLE,
})

export function useAccount(address) {
  address = fcl.withPrefix(address)
  const [$data, setData] = useRecoilState(data(address))
  const [$status, setStatus] = useRecoilState(fsm(address))

  const account = {
    $data,
    $status,
    async refetch() {
      setStatus(PROCESSING)
      await fetchAccount(address).then(setData)
      setStatus(IDLE)
    },
    isIdle: $status === IDLE,
    isProcessing: $status === PROCESSING,
    ...$data,
  }

  return account
}
