import {useEffect} from "react"
import {config} from "@onflow/config"

export function TestnetConfig() {
  useEffect(() => {
    config()
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
      .put("fcl.eventsPollRate", 2500)
  }, [])
  return null
}
