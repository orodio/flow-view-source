import {useState, useEffect} from "react"
import {query} from "@onflow/fcl"

const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

export function useScripts() {
  const [status, setStatus] = useState(PENDING)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // prettier-ignore
    query({
      cadence: `
        pub fun main(a: Int, b: Int): Int {
          return a + b
        }
      `,
      args: (arg, t) => [
        arg(5, t.Int),
        arg(6, t.Int),
      ],
    }).then(() => {
      setStatus(SUCCESS)
    }).catch(error => {
      setStatus(ERROR)
      setMessage(error.message)
    })
  }, [])

  return [status, message]
}
