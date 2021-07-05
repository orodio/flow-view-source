import {useState, useEffect, useCallback} from "react"
// import {template as transferTokens} from "@onflow/six-transfer-tokens"
import {unauthenticate, mutate, tx} from "@onflow/fcl"

const DEFAULT = "..."
const PENDING = "PENDING"
const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

export function useTransactions() {
  const [status, setStatus] = useState(DEFAULT)
  const [message, setMessage] = useState(null)
  const [txId, setTxId] = useState(null)
  const [txResult, setTxResult] = useState(null)

  useEffect(() => {
    if (txId != null) return tx(txId).subscribe(setTxResult)
  }, [txId])

  const trigger = useCallback(async () => {
    setStatus(PENDING)
    unauthenticate()

    // prettier-ignore
    mutate({
      cadence: `
        transaction(a: Int, b: Int) {
          prepare(acct: AuthAccount) {
            let c = a + b
            log(c)
            log(acct)
          }
        }
      `,
      args: (arg, t) => [
        arg(7, t.Int),
        arg(2, t.Int),
      ],
      limit: 55,
    }).then((resp) => {
      setStatus(SUCCESS)
      setTxId(resp.transactionId)
    }).catch((error) => {
      setStatus(ERROR)
      setMessage(error.message)
    })
  }, [])

  return [trigger, status, message, txId, txResult]
}
