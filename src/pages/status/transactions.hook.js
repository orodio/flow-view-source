import {useState, useEffect, useCallback} from "react"
import {template as transferTokens} from "@onflow/six-transfer-tokens"
import * as fcl from "@onflow/fcl"
// import * as t from "@onflow/types"

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
  }, [txId])

  const trigger = useCallback(async () => {
    setStatus(PENDING)
    fcl.unauthenticate()
    var acct = await fcl.authenticate()
    fcl
      .send([
        fcl.limit(35),
        transferTokens({
          proposer: fcl.authz,
          authorization: fcl.authz,
          payer: fcl.authz,
          amount: "0.0001",
          to: acct.addr,
        }),
        // fcl.args([fcl.arg(7, t.Int), fcl.arg(2, t.Int)]),
        // fcl.proposer(authz),
        // fcl.payer(authz),
        // fcl.authorizations([authz]),
        // fcl.transaction`
        //   transaction(a: Int, b: Int) {
        //     prepare(acct: AuthAccount) {
        //       let c = a + b
        //       log(c)
        //       log(acct)
        //     }
        //   }
        // `,
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
