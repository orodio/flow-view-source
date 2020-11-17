import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

export function useScripts() {
  const [status, setStatus] = useState(PENDING)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fcl
      .send([
        fcl.script`
          pub fun main(): Int {
            return 5 + 3
          }
        `,
      ])
      .then(fcl.decode)
      .then(() => setStatus(SUCCESS))
      .catch((error) => {
        setStatus(ERROR)
        setMessage(error.message)
      })
  }, [])

  return [status, message]
}
