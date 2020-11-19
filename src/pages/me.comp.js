import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
// import * as t from "@onflow/types"
import {template as setCodeTx} from "@onflow/six-set-code"

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-rust"
import "ace-builds/src-noconflict/theme-nord_dark"

import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccount} from "../hooks/use-account.hook"
import {fmtFlow} from "../util/fmt-flow.util"
import {Root} from "../styles/root.comp"
import {Roll, H1, Muted, List, ListItem, Button} from "../styles/text.comp"

function fmtStatus(status) {
  if (status === 0) return "Unknown"
  if (status === 1) return "Pending"
  if (status === 2) return "Finalized"
  if (status === 3) return "Executed"
  if (status === 4) return "Sealed"
  if (status === 5) return "Expired"
  return "Preparing"
}

function fetchCode(address) {
  if (address == null) return Promise.resolve("")
  return fcl.account(address).then((acct) => acct.code)
}

const DEFAULT = "DEFAULT"
const AUTHORIZING = "Authorizing Transaction"
const PENDING = "Deploying Contract"
const SUCCESS = "Contract Deployed"
const ERROR = "Error Deploying Contract"

export function Me() {
  const [user] = useCurrentUser()
  const [acct] = useAccount(user.addr)
  const [code, setCode] = useState("")
  const [status, setStatus] = useState(DEFAULT)
  const [txStatus, setTxStatus] = useState(null)

  useEffect(() => {
    fetchCode(user.addr).then(setCode)
  }, [user.addr])

  if (user.addr == null || acct == null)
    return (
      <Root>
        <H1>
          <Muted>Address: </Muted>
          <Button onClick={fcl.reauthenticate}>Authenticate</Button>
        </H1>
      </Root>
    )

  async function deploy(e) {
    try {
      e.preventDefault()
      console.log("DEPLOYING CODE", code)
      setStatus(AUTHORIZING)

      var resp = await fcl.send([
        setCodeTx({
          code: code,
          proposer: fcl.authz,
          payer: fcl.authz,
          authorization: fcl.authz,
        }),
        fcl.limit(1000),
      ])

      setStatus(PENDING)

      var unsub = fcl.tx(resp).subscribe((txStatus) => {
        setTxStatus(txStatus.status)
        console.log("txStatus", txStatus)
      })
      var txStatus = await fcl.tx(resp).onceSealed()
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
        <span>{fcl.display(user.addr)} </span>
        <Button onClick={fcl.reauthenticate}>Change Account</Button>
      </H1>
      <List>
        <ListItem label="Primary Balance" value={fmtFlow(acct.balance)} />
      </List>
      <div style={{display: "flex", flexDirection: "column", width: "90vw"}}>
        <h3>Contract</h3>
        <div style={{marginBottom: "5px"}}>
          <AceEditor
            width="100%"
            height={`${((code || "").split("\n").length + 5) * 14}px`}
            mode="rust"
            theme="nord_dark"
            value={code}
            onChange={setCode}
            name="RAWR"
            tabSize={2}
            placeholder="No Contract Code Here..."
          />
        </div>
        {status === DEFAULT ? (
          <Button onClick={deploy}>
            Update Contract <small>(This is a transaction and will cost Flow)</small>
          </Button>
        ) : (
          <Button disabled>
            <Roll label={`${status} - ${fmtStatus(txStatus)}`} />
          </Button>
        )}
      </div>
    </Root>
  )
}
