import {useEffect} from "react"
import {config} from "@onflow/config"

export function MainnetConfig() {
  useEffect(() => {
    config()
      .put("accessNode.api", "https://access-mainnet-beta.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/authn")
      .put("fcl.eventsPollRate", 2500)
  }, [])
  return null
}
