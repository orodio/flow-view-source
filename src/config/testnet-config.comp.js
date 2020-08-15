import {useEffect} from "react"
import {config} from "@onflow/config"

export function TestnetConfig() {
  useEffect(() => {
    config()
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://flow-wallet-staging.blocto.app/authn")
  }, [])
  return null
}
