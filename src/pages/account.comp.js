import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {withPrefix, sansPrefix} from "../util/address.util"
import * as fcl from "@onflow/fcl"
import styled from "styled-components"
import Prism from "prismjs"

const decodeCode = code => {
  if (code.length) return new TextDecoder("utf-8").decode(code)
  return "No Code Deployed To This Address"
}

const getAccount = async address => {
  const resp = await fcl.send([fcl.getAccount(sansPrefix(address))])
  return fcl.decode(resp)
}

const Root = styled.div`
  font-family: monospace;
  color: #233445;
  font-size: 13px;
  padding: 21px;
`

const Muted = styled.span`
  color: #78899a;
`

const H1 = styled.h1``

export function Account() {
  const {address} = useParams()
  const [acct, setAcct] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    getAccount(address)
      .then(setAcct)
      .catch(() => setError(true))
  }, [address])
  useEffect(() => Prism.highlightAll(), [acct?.code])

  if (error != null)
    return (
      <Root>
        <H1>
          <Muted>Account: </Muted>
          <span>{withPrefix(address)}</span>
        </H1>
        <h3>
          <span>Could NOT fetch info for: </span>
          <Muted>{withPrefix(address)}</Muted>
        </h3>
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
          <span>{withPrefix(address)}</span>
        </H1>
        <h3>
          <span>Fetching info for: </span>
          <Muted>{withPrefix(address)}</Muted>
        </h3>
      </Root>
    )

  return (
    <Root>
      <H1>
        <Muted>Account: </Muted>
        <span>{withPrefix(acct.address)}</span>
      </H1>
      <ul>
        <li>
          <strong>Balance</strong>
          <Muted>: </Muted>
          <span>{acct.balance}</span>
        </li>
      </ul>
      <div>
        <h3>
          <span>Keys</span>
          <Muted> {acct.keys.length}</Muted>
        </h3>
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
            {acct.keys.map(key => {
              console.log(key)
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
      <div>
        <h3>Code</h3>
        <pre>
          <code className="language-javascript">{decodeCode(acct.code)}</code>
        </pre>
      </div>
    </Root>
  )
}
