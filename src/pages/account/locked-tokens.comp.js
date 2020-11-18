import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {H3, Muted, List, ListItem, Details, Detail} from "../../styles/text.comp"
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
  }, [address])

  useEffect(() => {
    if (tokens == null) return
    fcl
      .account(tokens.address)
      .then(setAcct)
      .catch((d) => console.error(`getAccount(${address})`, d))
  }, [address, tokens])

  if (tokens == null || acct == null) return null

  return (
    <>
      <H3>
        <strong>Community Sale/Auction: </strong>
        <Muted>{calcTotal(acct, tokens)}</Muted>
      </H3>
      <List>
        <ListItem value="Locked Token Vault">
          <Details style={{margin: "5px 13px 13px 0"}}>
            <Detail label="Unlocked" value={calcUnlocked(acct, tokens)} />
            <Detail label="Locked" value={calcLocked(acct, tokens)} />
          </Details>
        </ListItem>
        <ListItem>This Account has an associated Locked Token Vault capability.</ListItem>
        <ListItem>While locked, these tokens can only be used for staking and delegating.</ListItem>
        <ListItem>These locked tokens will unlock over time.</ListItem>
        <ListItem>
          Rewards received from staking and delegating are <strong>NOT</strong> locked.
        </ListItem>
        <ListItem>
          Rewards must be withdrawn into your primary balance if you wish to use them for things
          other than staking or delegating.
        </ListItem>
      </List>
    </>
  )
}
