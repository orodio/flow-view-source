import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {template as setCode} from "@onflow/six-set-code"

import {Root} from "../styles/root.comp"
import {Muted} from "../styles/muted.comp"
import {H1} from "../styles/h1.comp"

function fetchCode(address) {
  if (address == null) return Promise.resolve("")
  return fcl
    .send([fcl.getAccount(address)])
    .then(fcl.decode)
    .then((acct) => acct.code)
    .then((d) => (console.log("d", d), d))
}

const DEFAULT = "DEFAULT"
const PENDING = "Deploying Contract"
const SUCCESS = "Contract Deployed"
const ERROR = "Error Deploying Contract"

export function Me() {
  const [user, setUser] = useState({addr: null})
  const [code, setCode] = useState("")
  const [status, setStatus] = useState(DEFAULT)
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  useEffect(() => {
    fetchCode(user.addr).then(setCode)
  }, [user.addr])

  if (user.addr == null)
    return (
      <Root>
        <H1>
          <Muted>Address: </Muted>
          <button onClick={fcl.authenticate}>Authenticate</button>
        </H1>
      </Root>
    )

  async function deploy(e) {
    try {
      e.preventDefault()
      setStatus(PENDING)
      console.log("DEPLOYING CODE", code)

      const authz = fcl.currentUser().authorization

      var resp = await fcl.send([
        fcl.transaction`
          transaction(code: String) {
            prepare(acct: AuthAccount) {
              acct.setCode(code.decodeHex())
            }
          }
        `,
        fcl.proposer(authz),
        fcl.payer(authz),
        fcl.authorizations([authz]),
        fcl.args([fcl.arg(Buffer.from(code, "utf8").toString("hex"), t.String)]),
      ])

      var unsub = fcl.tx(resp).subscribe((txStatus) => {
        console.log("txStatus", txStatus)
      })
      var txStatus = await fcl.tx(resp).onceExecuted()
      unsub()
      console.log("EXECUTED", txStatus)

      await fetchCode(user.addr).then(setCode)
      setStatus(SUCCESS)
    } catch (error) {
      console.error("DEPLOYMENT ERROR", error)
      setStatus(ERROR)
    } finally {
      await new Promise((resolve) => setTimeout(() => resolve(), 2000))
      setStatus(DEFAULT)
    }
  }

  return (
    <Root>
      <H1>
        <Muted>Address: </Muted>
        <span>{fcl.display(user.addr)}</span>
        <button
          onClick={() => {
            fcl.unauthenticate()
            fcl.authenticate()
          }}
        >
          Change Account
        </button>
      </H1>
      <div style={{display: "flex", flexDirection: "column", width: "90vw"}}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{width: "100%", height: "75vh", marginBottom: "13px"}}
        />
        {status === DEFAULT ? (
          <button onClick={deploy}>Update Code</button>
        ) : (
          <button>{status}</button>
        )}
      </div>
    </Root>
  )
}
