import {config} from "@onflow/fcl"
import {useEffect} from "react"

export function TestnetConfig() {
  useEffect(() => {
    config({
      env: "testnet",
      "accessNode.api": "https://access-testnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
      "fcl.eventsPollRate": 2500,
      "0xLockedTokens": "0x95e019a17d0e23d7",
      "0xFungibleToken": "0x9a0766d93b6608b7",
      "0xFUSD": "0xe223d8a629e49c68",
    })
  }, [])
  return null
}
