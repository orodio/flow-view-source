import {Suspense} from "react"
import {NavLink as Link, useParams} from "react-router-dom"
import {withPrefix} from "@onflow/fcl"
import {Item, Group, HR} from "../../../comps/sidebar"
import {useCurrentUser} from "../../../hooks/use-current-user"
import {useAccount} from "../../../hooks/use-account"

const accountUrl = params => `/${params.env}/account/${withPrefix(params.address)}`
const contractUrl = (params, name) => `${accountUrl(params)}/contract/${name}`

export function Contracts() {
  const params = useParams()
  const user = useCurrentUser()
  const acct = useAccount(params.address)

  const IS_CURRENT_USER = withPrefix(user.addr) === withPrefix(params.address)

  const contracts = Object.keys(acct?.contracts ?? {})

  return (
    <Group
      title={`${contracts.length} Contracts`}
      icon={acct.isProcessing ? `circle-notch fa-spin` : `toilet-paper fa-flip-horizontal`}
    >
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
  return (
    <Suspense fallback={<Loading />}>
      <Contracts />
    </Suspense>
  )
}
