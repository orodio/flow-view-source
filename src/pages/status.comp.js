import {useConfig} from "../hooks/use-config.hook"
import {Root} from "../styles/root.comp"
import {Roll, H1, H3, Muted, List, ListItem, Good, Bad, Json, Pre} from "../styles/text.comp"

import {usePing} from "./status/ping.hook"
import {useScripts} from "./status/scripts.hook"
import {useTransactions} from "./status/transactions.hook"

const status = status => {
  if (status === "PENDING") return <Roll label={status} />
  if (status === "SUCCESS") return <Good>{status}</Good>
  if (status === "ERROR") return <Bad>{status}</Bad>
  if (status === "UNKNOWN") return <Bad>{status}</Bad>
  if (status === "FINALIZED") return <Roll label={status} />
  if (status === "EXECUTED") return <Roll label={status} />
  if (status === "SEALED") return <Good>{status}</Good>
  if (status === "EXPIRED") return <Bad>{status}</Bad>
  return status
}

const more = message => {
  if (message == null) return null
  return <Pre>{message}</Pre>
}

function fmtStatus(status) {
  if (status === 0) return "UNKNOWN"
  if (status === 1) return "PENDING"
  if (status === 2) return "FINALIZED"
  if (status === 3) return "EXECUTED"
  if (status === 4) return "SEALED"
  if (status === 5) return "EXPIRED"
  return "N/A"
}

export function Status() {
  const env = useConfig("env")
  const api = useConfig("accessNode.api")
  const dis = useConfig("discovery.wallet")

  const [pingStatus, pingMessage] = usePing()
  const [scriptsStatus, scriptsMessage] = useScripts()
  const [triggerTx, txStatus, txMessage, txId, txResult] = useTransactions()

  return (
    <Root>
      <H1>
        <Muted>Status: </Muted>
        <span>{env}</span>
      </H1>
      <List>
        <ListItem label="chain" value={env} />
        <ListItem label="accessNode.api" value={api} />
        <ListItem label="discovery.wallet" value={dis} />
      </List>
      <div>
        <H3>
          <strong>Tests </strong>
          <button onClick={triggerTx}>Test Transactions</button>
        </H3>
        <List>
          <ListItem label="Ping" value={status(pingStatus)}>
            {more(pingMessage)}
          </ListItem>
          <ListItem label="Script" value={status(scriptsStatus)}>
            {more(scriptsMessage)}
          </ListItem>
          <ListItem label="Tx Received" value={status(txId || txStatus || "...")}>
            {more(txMessage)}
          </ListItem>
          <ListItem
            label="Tx Execution"
            value={status(txResult?.status ? fmtStatus(txResult.status) : txStatus)}
          >
            {txResult && <Json>{txResult}</Json>}
          </ListItem>
        </List>
      </div>
    </Root>
  )
}
