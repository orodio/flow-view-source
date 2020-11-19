import * as fcl from "@onflow/fcl"
import {useEffect} from "react"

export function TestnetConfig() {
  useEffect(() => {
    fcl
      .config()
      .put("env", "testnet")
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
      .put("fcl.eventsPollRate", 2500)
      .put("contract.LockedTokens", "0x95e019a17d0e23d7")
      .put("contract.FungibleToken", "0x9a0766d93b6608b7")
  }, [])
  return null
}
