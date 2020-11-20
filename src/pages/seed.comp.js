import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {useCurrentUser} from "../hooks/use-current-user.hook"
import {useAccount} from "../hooks/use-account.hook"
import {fmtFlow} from "../util/fmt-flow.util"

import {Root} from "../styles/root.comp"
import {Roll, H1, H3, Button, Muted, List, ListItem} from "../styles/text.comp"

const AMOUNTS = ["1.00", "10.00", "100.00", "1000.00", "10000.00"]
const DEFAULT_AMOUNT = AMOUNTS[1]
const PLACEHOLDER = [
  "0xba1132bc08f82fe2",
  "0x1d007d755706c469",
  "0x7ed3a3ff81329797",
  "0xeaa6b8d739b99c4d",
].join("\n")

const nax = axs =>
  axs
    .trim()
    .split("\n")
    .map(d => d.trim())
    .filter(Boolean)

function fmtStatus(status) {
  if (status === 0) return "Unknown"
  if (status === 1) return "Pending"
  if (status === 2) return "Finalized"
  if (status === 3) return "Executed"
  if (status === 4) return "Sealed"
  if (status === 5) return "Expired"
  return "Preparing"
}

const DEFAULT = "DEFAULT"
const AUTHORIZING = "Authorizing Transaction"
const PENDING = "Blockchain Be Blockchaining"
const SUCCESS = "Transaction was Successful"
const ERROR = "Transaction Failed"

export function Seed() {
  const [user, loggedIn] = useCurrentUser()
  const [acct, refetchAccount] = useAccount(user.addr)
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [addresses, setAddresses] = useState("")
  const [status, setStatus] = useState(DEFAULT)
  const [txStatus, setTxStatus] = useState(null)

  if (!loggedIn || !acct) {
    return (
      <Root>
        <H1>
          <Muted>Source: </Muted>
          <Button onClick={fcl.reauthenticate}>Authenticate</Button>
        </H1>
      </Root>
    )
  }

  async function seed(e) {
    try {
      e.preventDefault()
      console.log("Seeding", {amount, accounts: nax(addresses)})
      setStatus(AUTHORIZING)

      var resp = await fcl.send([
        fcl.limit(1000),
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([fcl.arg(amount, t.UFix64), fcl.arg(nax(addresses), t.Array(t.Address))]),
        fcl.transaction`
import FungibleToken from ${await fcl.config().get("contract.FungibleToken")}

transaction(amount: UFix64, axs: [Address]) {
  prepare(acct: AuthAccount) {
    for addr in axs {
      let vault <- acct
        .borrow<&{FungibleToken.Provider}>(from: /storage/flowTokenVault)!
        .withdraw(amount: amount)

      getAccount(addr)
        .getCapability(/public/flowTokenReceiver)!
        .borrow<&{FungibleToken.Receiver}>()!
        .deposit(from: <- vault)
    }
  }
}
        `,
      ])
      setStatus(PENDING)

      var unsub = fcl.tx(resp).subscribe(txStatus => {
        setTxStatus(txStatus.status)
        console.log("txStatus", txStatus)
      })
      var txStatus = await fcl.tx(resp).onceExecuted()
      unsub()
      console.log("EXECUTED", txStatus)

      setStatus(SUCCESS)
      setAmount(DEFAULT_AMOUNT)
      setAddresses("")
    } catch (error) {
      console.error("SEED ERROR", error)
      setStatus(ERROR)
    } finally {
      await new Promise(r => setTimeout(r, 2000))
      setStatus(DEFAULT)
      refetchAccount()
    }
  }

  return (
    <Root>
      <H1>
        <Muted>Source: </Muted>
        <strong>{user.addr}</strong>
        <Button onClick={fcl.reauthenticate}>Change Account</Button>
      </H1>
      <List>
        <ListItem label="Balance" value={fmtFlow(acct.balance)} />
      </List>
      <H3>Seed Accounts With Flow</H3>
      <div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label>Amount:</label>
          <select id="amount" value={amount} onChange={e => setAmount(e.target.value)}>
            {AMOUNTS.map(d => (
              <option key={d} value={d}>
                {d} FLOW
              </option>
            ))}
          </select>
        </div>
        <div style={{display: "flex", flexDirection: "column", marginTop: "13px"}}>
          <label>To:</label>
          <textarea
            placeholder={PLACEHOLDER}
            cols="18"
            rows="15"
            value={addresses}
            onChange={e => setAddresses(e.target.value)}
          />
        </div>
        {status === DEFAULT ? (
          <Button onClick={seed}>
            Seed {nax(addresses).length} Account(s) with {amount} FLOW
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
