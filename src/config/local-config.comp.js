import {useEffect} from "react"
import {config} from "@onflow/config"

export function LocalConfig() {
  useEffect(() => {
    config()
      .put("accessNode.api", "http://localhost:8080")
      .put("challenge.handshake", "http://localhost:8701/flow/authenticate")
      .put("fcl.eventsPollRate", 1000)
  }, [])
  return null
}
