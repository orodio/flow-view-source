import {Suspense} from "react"
import * as fcl from "@onflow/fcl"
import {NavLink, Link, useParams} from "react-router-dom"
import {withPrefix} from "@onflow/fcl"
import {Item, Group} from "../../../comps/sidebar"
import {useAccount} from "../../../hooks/use-account"
import {fmtFlow} from "../../../util/fmt-flow.util"

const accountUrl = params => `/${params.env}/account/${withPrefix(params.address)}`

export function Account() {
  const params = useParams()
  const acct = useAccount(params.address)
  const nKeys = acct?.keys?.length ?? 0

  return (
    <Group
      title={fcl.withPrefix(params.address)}
      icon="ghost"
      exact
      as={NavLink}
      to={accountUrl(params)}
    >
      <Item icon="narwhal fa-flip-horizontal" as={Link} to={accountUrl(params)}>
        {fmtFlow(acct.balance)}
      </Item>
      <Item icon={nKeys ? "piano" : "lock"} as={NavLink} to={accountUrl(params) + "/keys"}>
        {nKeys} Keys
      </Item>
    </Group>
  )
}

function Loading() {
  return <Group title="Account" icon="circle-notch fa-spin"></Group>
}

export default function WrappedAccount() {
  return (
    <Suspense fallback={<Loading />}>
      <Account />
    </Suspense>
  )
}
