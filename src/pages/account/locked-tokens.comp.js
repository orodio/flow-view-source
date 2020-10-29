import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {H3} from "../../styles/h3.comp"
import {Muted} from "../../styles/muted.comp"
import {fetchLockedTokens} from "../../flow/fetch-locked-tokens.script"
import {fmtFlow} from "../../util/fmt-flow.util"

const calcTotal = (acct, tokens) => {
  return fmtFlow(acct.balance)
}

const calcLocked = (acct, tokens) => {
  return fmtFlow(Number(tokens.locked) * 100_000_000)
}

const calcUnlocked = (acct, tokens) => {
  return fmtFlow(acct.balance - Number(tokens.locked) * 100_000_000)
}

export function LockedTokens({address}) {
  const [tokens, setTokens] = useState(null)
  const [acct, setAcct] = useState(null)

  useEffect(() => {
    fetchLockedTokens(address)
      .then(setTokens)
      .catch((d) => console.error(`fetchLockedTokens(${address})`, d))
  }, [])

  useEffect(() => {
    if (tokens == null) return
    fcl
      .send([fcl.getAccount(tokens.address)])
      .then(fcl.decode)
      .then(setAcct)
      .catch((d) => console.error(`getAccount(${address})`, d))
  }, [tokens])

  if (tokens == null || acct == null) return null

  return (
    <>
      <H3>
        <span>Locked Token Vault</span>
      </H3>
      <ul>
        <li>This Account has an associated Locked Token Vault capability.</li>
        <li>While locked these tokens can only be used for staking and delegating.</li>
        <li>These locked tokens will unlock over time.</li>
        <li>
          Rewards received from staking and delegating are <strong>NOT</strong> locked
        </li>
        <li>
          Rewards must be withdrawn into your primary balance if you wish to use them for things
          other than staking or delegating.
        </li>
      </ul>
      <ul style={{marginLeft: "-18px"}}>
        <li style={{display: "flex"}}>
          <Muted style={{width: "75px"}}>Unlocked: </Muted>
          <strong style={{width: "100px", textAlign: "right"}}>{calcUnlocked(acct, tokens)}</strong>
        </li>
        <li style={{display: "flex"}}>
          <Muted style={{width: "75px"}}>Locked: </Muted>
          <strong style={{width: "100px", textAlign: "right"}}>{calcLocked(acct, tokens)}</strong>
        </li>
        <Muted>---------------------------</Muted>
        <li style={{display: "flex"}}>
          <Muted style={{width: "75px"}}>Total</Muted>
          <strong style={{width: "100px", textAlign: "right"}}>{calcTotal(acct, tokens)}</strong>
        </li>
      </ul>
    </>
  )
}
