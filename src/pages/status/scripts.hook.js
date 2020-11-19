import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

export function useScripts() {
  const [status, setStatus] = useState(PENDING)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fcl
      .send([
        fcl.args([fcl.arg(6, t.Int), fcl.arg(3, t.Int)]),
        fcl.script`
          pub fun main(a: Int, b: Int): Int {
            return a + b
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
