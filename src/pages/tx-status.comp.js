import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {useParams} from "react-router-dom"
import {Root} from "../styles/root.comp"
import {H1, H3, Muted, Json, Pre, List, ListItem} from "../styles/text.comp"
import {Editor} from "../comps/editor"

function fmtStatus(status) {
  if (status === 0) return "Unknown"
  if (status === 1) return "Pending"
  if (status === 2) return "Finalized"
  if (status === 3) return "Executed"
  if (status === 4) return "Sealed"
  if (status === 5) return "Expired"
  return "N/A"
}

export function TxStatus() {
  const {txId} = useParams()
  const [txStatus, setTxStatus] = useState(null)
  const [txInfo, setTxInfo] = useState(null)

  useEffect(() => fcl.tx(txId).subscribe(setTxStatus))
  useEffect(() => {
    fcl
      .send([fcl.getTransaction(txId)])
      .then(fcl.decode)
      .then(setTxInfo)
  }, [])

  if (txStatus == null || txInfo == null) {
    return (
      <Root>
        <H1>
          <Muted>Tx: </Muted>
          <span>{txId}</span>
        </H1>
        <H3>
          <span>Fetching info for: </span>
          <Muted>{txId}</Muted>
        </H3>
      </Root>
    )
  }

  return (
    <Root>
      <H1>
        <Muted>Tx: </Muted>
        <span>{txId}</span>
      </H1>
      <List>
        <ListItem
          label="Status"
          value={`${fmtStatus(txStatus.status)} (${txStatus.status})`}
          children={txStatus.errorMessage && <Pre bad>{txStatus.errorMessage}</Pre>}
        />
      </List>
      <div>
        <H3>Details</H3>
        <List>
          <ListItem label="Proposer" value={fcl.withPrefix(txInfo?.proposalKey?.address)} />
          {txInfo?.authorizers?.length >= 1 && (
            <ListItem label="AuthAccounts">
              <List>
                {txInfo?.authorizers?.map((d, i) => (
                  <ListItem key={i} value={fcl.withPrefix(d)} />
                ))}
              </List>
            </ListItem>
          )}
          <ListItem label="Payer" value={fcl.withPrefix(txInfo?.payer)} />
          <hr />
          <ListItem label="Cadence">
            <Editor key="cadence-script" code={txInfo?.script} name="cadence-script" />
          </ListItem>
          <hr />
          <ListItem label="Arguments">
            <Json>{txInfo?.args}</Json>
          </ListItem>
        </List>
      </div>
      <div>
        <H3>
          <span>Events</span>
          <Muted> {txStatus.events.length}</Muted>
        </H3>
        <List>
          {txStatus.events.map(ev => {
            return (
              <ListItem key={ev.eventIndex} value={ev.type}>
                <Json>{ev.data}</Json>
              </ListItem>
            )
          })}
        </List>
      </div>
    </Root>
  )
}
