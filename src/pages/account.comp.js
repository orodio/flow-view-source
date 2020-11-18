import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import * as fcl from "@onflow/fcl"
import {Root} from "../styles/root.comp"
import {H1, H3, Muted, List, ListItem, Details, Detail} from "../styles/text.comp"
import {LockedTokens} from "./account/locked-tokens.comp"
import {fmtFlow} from "../util/fmt-flow.util"

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-rust"
import "ace-builds/src-noconflict/theme-nord_dark"

const fmtCurve = (i) =>
  ({
    2: "ECDSA_P256",
    3: "ECDSA_secp256k1",
  }[i] || "--")

const fmtHash = (i) =>
  ({
    1: "SHA2_256",
    3: "SHA3_256",
  }[i] || "--")

export function Account() {
  const {address} = useParams()
  const [acct, setAcct] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    fcl
      .account(address)
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
        <List>
          <ListItem>This probably means it doesn't exist</ListItem>
        </List>
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
      <List>
        <ListItem label="Primary Balance" value={fmtFlow(acct.balance)} />
      </List>
      <LockedTokens address={fcl.withPrefix(acct.address)} />
      <div>
        <H3>
          <span>Keys</span>
          <Muted> {acct.keys.length}</Muted>
        </H3>
        {!acct.keys.length && (
          <List>
            <ListItem>
              This account is <strong>LOCKED</strong> (It has <strong>NO KEYS</strong>).
            </ListItem>
            <ListItem>
              As this account is locked, it can only be interacted with via already existing public
              and private capabilities.
            </ListItem>
          </List>
        )}
        {!!acct.keys.length && (
          <List>
            {acct.keys.map((key) => {
              return (
                <ListItem key={key.publicKey} value={key.publicKey}>
                  <Details style={{margin: "5px 13px 13px 0"}}>
                    <Detail label="KeyId" value={key.index} />
                    <Detail label="Weight" value={key.weight} />
                    <Detail label="Curve" value={fmtCurve(key.signAlgo)} />
                    <Detail label="Hash" value={fmtHash(key.hashAlgo)} />
                    <Detail label="SeqNum" value={key.sequenceNumber} />
                  </Details>
                </ListItem>
              )
            })}
          </List>
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
