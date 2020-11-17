import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import * as fcl from "@onflow/fcl"
import {Root} from "../styles/root.comp"
import {H1, H3, Muted} from "../styles/text.comp"
import {LockedTokens} from "./account/locked-tokens.comp"
import {fmtFlow} from "../util/fmt-flow.util"

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-rust"
import "ace-builds/src-noconflict/theme-nord_dark"

const getAccount = async (address) => {
  const resp = await fcl.send([fcl.getAccount(fcl.sansPrefix(address))])
  return fcl.decode(resp)
}

export function Account() {
  const {address} = useParams()
  const [acct, setAcct] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    getAccount(address)
      .then(setAcct)
      .catch(() => setError(true))
  }, [address])

  if (error != null)
    return (
      <Root>
        <H1>
          <Muted>Account: </Muted>
          <span>{fcl.withPrefix(address)}</span>
        </H1>
        <H3>
          <span>Could NOT fetch info for: </span>
          <Muted>{fcl.withPrefix(address)}</Muted>
        </H3>
        <ul>
          <li>This probably means it doesn't exist</li>
        </ul>
      </Root>
    )
  if (acct == null)
    return (
      <Root>
        <H1>
          <Muted>Account: </Muted>
          <span>{fcl.withPrefix(address)}</span>
        </H1>
        <H3>
          <span>Fetching info for: </span>
          <Muted>{fcl.withPrefix(address)}</Muted>
        </H3>
      </Root>
    )

  return (
    <Root>
      <H1>
        <Muted>Account: </Muted>
        <span>{fcl.withPrefix(acct.address)}</span>
      </H1>
      <ul>
        <li>
          <strong>Primary Balance</strong>
          <Muted>: </Muted>
          <span>{fmtFlow(acct.balance)}</span>
        </li>
      </ul>
      <LockedTokens address={fcl.withPrefix(acct.address)} />
      <div>
        <H3>
          <span>Keys</span>
          <Muted> {acct.keys.length}</Muted>
        </H3>
        {!acct.keys.length && (
          <ul>
            <li>
              This account is <strong>LOCKED</strong> (It has <strong>NO KEYS</strong>).
            </li>
            <li>
              As this account is locked, it can only be interacted with via already existing public
              and private capabilities.
            </li>
          </ul>
        )}
        {!!acct.keys.length && (
          <ul>
            {acct.keys.map((key) => {
              return (
                <li key={key.publicKey}>
                  <strong title="index:weight:curve:hash:publicKey">
                    <span>{key.index}</span>
                    <Muted>:</Muted>
                    <span>{key.weight}</span>
                    <Muted>:</Muted>
                    <span>{key.signAlgo}</span>
                    <Muted>:</Muted>
                    <span>{key.hashAlgo}</span>
                    <Muted>:</Muted>
                    {key.publicKey}
                  </strong>{" "}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {acct.code && acct.code !== "" && (
        <div>
          <H3>Code</H3>
          <AceEditor
            width="100%"
            height={`${(acct.code.split("\n").length + 5) * 14}px`}
            mode="rust"
            theme="nord_dark"
            value={acct.code}
            name="RAWR"
            tabSize={2}
            placeholder="No Contract Code Here..."
            readOnly={true}
          />
        </div>
      )}
    </Root>
  )
}
