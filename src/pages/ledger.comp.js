import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {useTx, IDLE} from "../hooks/use-tx.hook"
// import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Root} from "../styles/root.comp"
import {Roll, Json, Button as Btn, A, List, ListItem} from "../styles/text.comp"
import {CODE} from "@onflow/six-transfer-tokens"

export function Ledger() {
  const [execTx, status, txStatus, details] = useTx([
    fcl.transaction(CODE),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(35),
  ])

  async function tx(e) {
    e.preventDefault()
    const user = await fcl.reauthenticate()
    // prettier-ignore
    execTx([
      fcl.arg("0.001", t.UFix64),
      fcl.arg(user.addr, t.Address),
    ])
  }

  return (
    <Root>
      {status === IDLE ? (
        <Btn onClick={tx}>Submit Transaction</Btn>
      ) : (
        <Btn disabled>
          <Roll label={txStatus} />
        </Btn>
      )}
      <List>
        <ListItem label="status" value={status} />
        <ListItem label="txStatus" value={txStatus} />
        <ListItem label="txID" value={<A>{details.txId}</A>} />
      </List>
      <Json key={JSON.stringify(details)}>{details}</Json>
    </Root>
  )
}
