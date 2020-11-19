import * as fcl from "@onflow/fcl"
import {useEffect} from "react"

export function MainnetConfig() {
  useEffect(() => {
    fcl
      .config()
      .put("env", "mainnet")
      .put("accessNode.api", "https://access-mainnet-beta.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/authn")
      .put("fcl.eventsPollRate", 2500)
      .put("0xLockedTokens", "0x8d0e87b65159ae63")
      .put("0xFungibleToken", "0xf233dcee88fe0abe")
      .put("contract.LockedTokens", "0x8d0e87b65159ae63")
      .put("contract.FungibleToken", "0xf233dcee88fe0abe")
  }, [])
  return null
}
