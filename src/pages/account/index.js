import {Suspense} from "react"
import {useParams} from "react-router-dom"
import {useAccount} from "../../hooks/use-account"
import {Base} from "../../comps/base"
import {withPrefix} from "@onflow/fcl"
import {Wat} from "../../comps/wat"
import {SideBar} from "./sidebar"
import {Group, Item, Icon} from "../../comps/sidebar"
import {fmtFlow} from "../../util/fmt-flow.util"

const Header = () => {
  const {env, address} = useParams()

  return (
    <Wat
      icon="ghost"
      parts={[
        {
          to: `/${env}`,
          label: env,
        },
        {label: "account"},
        {
          to: `/${env}/account/${withPrefix(address)}`,
          label: withPrefix(address),
        },
      ]}
    />
  )
}

export function Page() {
  const {address} = useParams()
  const acct = useAccount(address)

  return (
    <Base sidebar={<SideBar />} header={<Header />}>
      <div style={{padding: "13px"}}>
        <Group icon="sack" title="Fungible Tokens">
          <Item icon="narwhal fa-flip-horizontal">Primary Balance: {fmtFlow(acct.balance)}</Item>
        </Group>
      </div>
    </Base>
  )
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}
