import {useState, useEffect} from "react"
import {send, ping} from "@onflow/fcl"

const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

export function usePing() {
  const [status, setStatus] = useState(PENDING)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    send([ping()])
      .then(() => setStatus(SUCCESS))
      .catch(error => {
        setStatus(ERROR)
        setMessage(error.message)
      })
  }, [])

  return [status, message]
}
