import * as fcl from "@onflow/fcl"
import {NavLink, Link, useParams} from "react-router-dom"
import {Item, Group} from "../../../comps/sidebar"
import {useFlowBalance} from "../../../hooks/use-flow-balance"
import {useFusdBalance} from "../../../hooks/use-fusd-balance"
import {useAccountKeys} from "../../../hooks/use-account-keys"
import {useAccountStorage} from "../../../hooks/use-account-storage"

const accountUrl = params => `/${params.env}/account/${fcl.withPrefix(params.address)}`

function storageCapacity(storage) {
  let used = storage?.used ?? 1
  let capacity = storage?.capacity ?? 1
  return ((used / capacity) * 100).toFixed(2) + "%"
}

export function Account() {
  const params = useParams()
  const flowBalance = useFlowBalance(params.address)
  const fusdBalance = useFusdBalance(params.address)
  const accountKeys = useAccountKeys(params.address)
  const accountStorage = useAccountStorage(params.address)

  return (
    <Group
      title={fcl.withPrefix(params.address)}
      icon="ghost"
      exact
      as={NavLink}
      to={accountUrl(params)}
    >
      <Item icon="narwhal fa-flip-horizontal" as={Link} to={accountUrl(params)}>
        {flowBalance}
      </Item>
      <Item icon="money-bill" as={Link} to={accountUrl(params)}>
        {fusdBalance}
      </Item>
      <Item icon="box-heart" as={Link} to={accountUrl(params)}>
        {storageCapacity(accountStorage)} Capacity
      </Item>
      <Item
        icon={accountKeys?.length ? "piano" : "lock"}
        as={NavLink}
        to={accountUrl(params) + "/keys"}
      >
        {accountKeys?.length} Keys
      </Item>
    </Group>
  )
}

export default function WrappedAccount() {
  return <Account />
}
