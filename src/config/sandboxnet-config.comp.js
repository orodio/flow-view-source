import * as fcl from "@onflow/fcl"
import {useEffect} from "react"
import {send} from "@onflow/transport-http"

export function SandboxConfig() {
  useEffect(() => {
    fcl
      .config()
      .put("env", "sandboxnet")
      .put("flow.network", "sandboxnet")
      .put("accessNode.api", "https://rest-sandboxnet.onflow.org")
      .put("sdk.transport", send)
      .put("discovery.wallet", "https://fcl-discovery.onflow.org/sandboxnet/authn")
      .put("fcl.eventsPollRate", 2500)
      .put("0xLockedTokens", "0xf4527793ee68aede")
      .put("0xFungibleToken", "0xe20612a0776ca4bf")
      .put("0xFlowToken", "0x0661ab7d6696a460")
      .put("contract.LockedTokens", "0x95e019a17d0e23d7")
      .put("contract.FungibleToken", "0x9a0766d93b6608b7")
  }, [])
  return null
}
