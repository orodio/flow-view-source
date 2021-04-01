import * as fcl from "@onflow/fcl"
import {useEffect} from "react"

export function CanarynetConfig() {
  useEffect(() => {
    fcl
      .config()
      .put("env", "canarynet")
      .put("accessNode.api", "https://canary.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.onflow.org/canarynet/authn")
      .put("fcl.eventsPollRate", 2500)
      .put("0xLockedTokens", "0x95e019a17d0e23d7")
      .put("0xFungibleToken", "0x9a0766d93b6608b7")
      .put("contract.LockedTokens", "0x95e019a17d0e23d7")
      .put("contract.FungibleToken", "0x9a0766d93b6608b7")
  }, [])
  return null
}
