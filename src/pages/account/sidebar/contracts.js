import * as fcl from "@onflow/fcl"
import {NavLink as Link, useParams} from "react-router-dom"
import {Item, Group, HR} from "../../../comps/sidebar"
import {useCurrentUser} from "../../../hooks/use-current-user"
import {useAccountContractsLabels} from "../../../hooks/use-account-contracts-labels"

const accountUrl = params => `/${params.env}/account/${fcl.withPrefix(params.address)}`
const contractUrl = (params, name) => `${accountUrl(params)}/contract/${name}`

export function Contracts() {
  const params = useParams()
  const user = useCurrentUser()
  const contracts = useAccountContractsLabels(params.address)
  const IS_CURRENT_USER = fcl.withPrefix(user.addr) === fcl.withPrefix(params.address)

  return (
    <Group title={`${contracts.length} Contracts`} icon="book-heart">
      {contracts.map(name => (
        <Item key={name} icon="scroll-old" as={Link} to={contractUrl(params, name)}>
          {name}
        </Item>
      ))}
      {IS_CURRENT_USER && <HR />}
      {IS_CURRENT_USER && (
        <Item as={Link} to={contractUrl(params, "new")} icon="plus">
          New Contract
        </Item>
      )}
    </Group>
  )
}

export function Loading() {
  return (
    <Group title="Contracts" icon="circle-notch fa-spin">
      <Item icon="scroll-old">---</Item>
    </Group>
  )
}

export default function WrappedContracts() {
  return <Contracts />
}
