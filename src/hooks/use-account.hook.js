// DEPRECATED PLEASE USE ./use-account.js
// DEPRECATED PLEASE USE ./use-account.js
// DEPRECATED PLEASE USE ./use-account.js

import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

export function useAccount(address) {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    address == null ? setAccount(null) : fcl.account(address).then(setAccount)
  }, [address])

  function refetch() {
    address == null ? setAccount(null) : fcl.account(address).then(setAccount)
  }

  return [account, refetch]
}
