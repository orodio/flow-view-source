import {useState, useEffect, useCallback} from "react"
import * as fcl from "@onflow/fcl"

const DEFAULT = "..."
const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

const authz = fcl.currentUser().authorization

export function useTransactions() {
  const [status, setStatus] = useState(DEFAULT)
  const [message, setMessage] = useState(null)
  const [txId, setTxId] = useState(null)
  const [txResult, setTxResult] = useState(null)

  useEffect(() => {
    if (txId != null) return fcl.tx(txId).subscribe(setTxResult)
  }, txId)

  const trigger = useCallback(() => {
    setStatus(PENDING)
    fcl.unauthenticate()
    fcl
      .send([
        fcl.transaction`
          transaction {
            prepare(acct: AuthAccount) {
              log(acct)
            }
          }
        `,
        fcl.proposer(authz),
        fcl.payer(authz),
        fcl.authorizations([authz]),
      ])
      .then((resp) => {
        setStatus(SUCCESS)
        setTxId(resp.transactionId)
      })
      .catch((error) => {
        setStatus(ERROR)
        setMessage(error.message)
      })
  }, [])

  return [trigger, status, message, txId, txResult]
}
