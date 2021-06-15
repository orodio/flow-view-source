import {useParams} from "react-router-dom"
import {Base} from "../../comps/base"
import {withPrefix} from "@onflow/fcl"
import {Wat} from "../../comps/wat"
import {SideBar} from "./sidebar"
import {Group, Item} from "../../comps/sidebar"

import {useFlowBalance} from "../../hooks/use-flow-balance"
import {useFusdBalance} from "../../hooks/use-fusd-balance"

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
  const flowBalance = useFlowBalance(address)
  const fusdBalance = useFusdBalance(address)

  return (
    <Base sidebar={<SideBar />} header={<Header />}>
      <div style={{padding: "13px"}}>
        <Group icon="sack" title="Fungible Tokens">
          <Item icon="narwhal fa-flip-horizontal">{flowBalance}</Item>
          <Item icon="money-bill">{fusdBalance}</Item>
        </Group>
      </div>
    </Base>
  )
}

export default function WrappedPage() {
  return <Page />
}
