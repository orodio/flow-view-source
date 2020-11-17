import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {useParams} from "react-router-dom"
import {Root} from "../styles/root.comp"
import {H1, H3, Muted, Json, List, ListItem} from "../styles/text.comp"

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
  const [txStatus, setTx] = useState(null)

  useEffect(() => fcl.tx(txId).subscribe((txStatus) => setTx({...txStatus})))

  if (txStatus == null) {
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
          children={txStatus.errorMessage}
        />
      </List>
      <div>
        <H3>
          <span>Events</span>
          <Muted> {txStatus.events.length}</Muted>
        </H3>
        <List>
          {txStatus.events.map((ev) => {
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
