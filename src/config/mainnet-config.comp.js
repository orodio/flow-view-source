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
      .put("contract.LockedTokens", "0x8d0e87b65159ae63")
  }, [])
  return null
}
