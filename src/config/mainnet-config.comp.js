import * as fcl from "@onflow/fcl"
import {useEffect} from "react"
import {send} from "@onflow/transport-http"

export function MainnetConfig() {
  useEffect(() => {
    fcl
      .config()
      .put("env", "mainnet")
      .put("flow.network", "mainnet")
      .put("accessNode.api", "https://rest-mainnet.onflow.org")
      .put("sdk.transport", send)
      .put("discovery.wallet", "https://fcl-discovery.onflow.org/authn")
      .put("fcl.eventsPollRate", 2500)
      .put("0xLockedTokens", "0x8d0e87b65159ae63")
      .put("0xFungibleToken", "0xf233dcee88fe0abe")
      .put("0xFUSD", "0x3c5959b568896393")
      .put("contract.LockedTokens", "0x8d0e87b65159ae63")
      .put("contract.FungibleToken", "0xf233dcee88fe0abe")
  }, [])
  return null
}
