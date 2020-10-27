import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {useParams} from "react-router-dom"
import {Root} from "../styles/root.comp"
import {Muted} from "../styles/muted.comp"
import {H1} from "../styles/h1.comp"
import {H3} from "../styles/h3.comp"

function fmtStatus(status) {
  switch (status) {
    case 0:
      return `${status} - Unknown`
    case 1:
      return `${status} - Pending`
    case 2:
      return `${status} - Finalized`
    case 3:
      return `${status} - Executed`
    case 4:
      return `${status} - Sealed`
    case 5:
      return `${status} - Expired`
    default:
      return "N/A"
  }
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
      <ul>
        <li>
          <strong>Status</strong>
          <Muted>: </Muted>
          <span>{fmtStatus(txStatus.status)}</span>
        </li>
        {txStatus.statusCode > 0 && (
          <>
            <li>
              <strong>Status Code</strong>
              <Muted>: </Muted>
              <span>{txStatus.statusCode}</span>
            </li>
            <li>
              <strong>Error Message</strong>
              <Muted>: </Muted>
              <span>{txStatus.errorMessage}</span>
            </li>
          </>
        )}
      </ul>
      <div>
        <H3>
          <span>Events</span>
          <Muted> {txStatus.events.length}</Muted>
        </H3>
        <ul>
          {txStatus.events.map((ev) => {
            return (
              <li key={ev.eventIndex}>
                <div>
                  <strong>{ev.type}</strong>
                </div>
                <pre>{JSON.stringify(ev.data, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      </div>
    </Root>
  )
}
