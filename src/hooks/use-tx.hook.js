import {useState} from "react"
import * as fcl from "@onflow/fcl"

export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"
export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"

export const PENDING_AUTH = "PENDING_AUTH"
export const SUBMITTING_TO_CHAIN = "SUBMITTING_TO_CHAIN"
export const UNKNOWN = "UNKNOWN"
export const PENDING = "PENDING"
export const FINALIZED = "FINALIZED"
export const EXECUTED = "EXECUTED"
export const SEALED = "SEALED"
export const EXPIRED = "EXPIRED"

const sleep = (ms = 3000) => new Promise(r => setTimeout(r, ms))

const statusKeys = txStatus => {
  switch (txStatus.status) {
    case 0:
      return UNKNOWN
    case 1:
      return PENDING
    case 2:
      return FINALIZED
    case 3:
      return EXECUTED
    case 4:
      return SEALED
    case 5:
      return EXPIRED
    default:
      return UNKNOWN
  }
}

const EMPTY_DETAILS = {
  txId: null,
  txStatus: null,
  error: null,
}

const log = l => v => (console.log(l, v), v)

export function useTx(fns = []) {
  const [status, setStatus] = useState(IDLE)
  const [txStatus, setTxStatus] = useState(IDLE)
  const [details, setDetails] = useState(EMPTY_DETAILS)

  async function trigger(args = []) {
    setStatus(PROCESSING)
    setTxStatus(PROCESSING)
    setDetails(() => EMPTY_DETAILS)

    if (args.length) {
      fns.push(ix => {
        ix.message.arguments = []
        ix.arguments = {}
        return ix
      })
      fns.push(fcl.args(args))
    }
    try {
      setTxStatus(PENDING_AUTH)
      var txId = await fcl.send(fns).then(fcl.decode)

      setTxStatus(SUBMITTING_TO_CHAIN)
      // eslint-disable-next-line
      setDetails(details => ({...details, txId}))

      var unsub = fcl.tx(txId).subscribe(txStatus => {
        txStatus.label = statusKeys(txStatus)
        setTxStatus(statusKeys(txStatus))
        // eslint-disable-next-line
        setDetails(details => ({...details, txStatus}))
      })

      await fcl
        .tx(txId)
        .onceSealed()
        .then(_ => {
          setStatus(SUCCESS)
          unsub()
        })
        .catch(error => {
          unsub()
          throw error
        })
    } catch (error) {
      console.error("useTx", error, {fns})
      setStatus(ERROR)
      // eslint-disable-next-line
      setDetails(details => ({...details, error}))
    } finally {
      await sleep()
      setStatus(IDLE)
      setTxStatus(IDLE)
    }
  }

  return [trigger, status, txStatus, details]
}
