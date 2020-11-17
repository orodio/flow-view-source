import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

export function useConfig(key) {
  const [value, set] = useState(null)
  useEffect(() => {
    fcl.config().get(key).then(set)
  }, [key])

  return value
}
