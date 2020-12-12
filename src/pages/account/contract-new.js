import {Suspense, useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {useAccount} from "../../hooks/use-account"
import {Base} from "../../comps/base"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {Wat} from "../../comps/wat"
import {Editor} from "../../comps/editor"
import {Bar, Icon, Pad, Button, Input, Label} from "../../comps/bar"
import {SideBar} from "./sidebar"
import {useCurrentUser} from "../../hooks/use-current-user"
import {useTx, IDLE} from "../../hooks/use-tx.hook"
import {Roll} from "../../styles/text.comp"

const Header = () => {
  const {env, address} = useParams()

  return (
    <Wat
      icon="plus"
      parts={[
        {
          to: `/${env}`,
          label: env,
        },
        {label: "account"},
        {
          to: `/${env}/account/${fcl.withPrefix(address)}`,
          label: fcl.withPrefix(address),
        },
        {label: "contract"},
        {
          to: `/${env}/account/${fcl.withPrefix(address)}/contract/new`,
          label: "new",
        },
      ]}
    />
  )
}

function Footer({code, name}) {
  const history = useHistory()
  const params = useParams()
  const acct = useAccount(params.address)

  const [exec, status, txStatus, details] = useTx(
    [
      fcl.transaction`
      transaction(name: String, code: String) {
        prepare(acct: AuthAccount) {
          acct.contracts.add(name: name, code: code.decodeHex())
        }
      }
    `,
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.limit(1000),
    ],
    {
      async onSuccess() {
        await acct.refetch()
        history.push(`/${params.env}/account/${fcl.withPrefix(params.address)}/contract/${name}`)
      },
    }
  )

  const saveContract = () => {
    // prettier-ignore
    exec([
      fcl.arg(name, t.String),
      fcl.arg(Buffer.from(code, "utf8").toString("hex"), t.String)
    ])
  }

  if (status !== IDLE)
    return (
      <Bar>
        <Label>
          <Roll label={txStatus} />
        </Label>
        {details.txId && <Label>{details.txId}</Label>}
      </Bar>
    )

  return (
    <Bar reverse>
      <Button disabled={name.length < 3} onClick={saveContract}>
        <Icon icon="save" />
        <Pad>Deploy Contract</Pad>
      </Button>
      <Input defaultValue={name} disabled placeholder="Contract Name" />
    </Bar>
  )
}

export function Page() {
  const params = useParams()
  const user = useCurrentUser()
  const [code, setCode] = useState(Array.from({length: 12}, _ => "\n").join(""))
  const [name, setName] = useState("")
  useEffect(() => {
    setName(code.match(/(?<access>pub|access\(all\)) contract (?<name>\w+)/)?.groups?.name ?? "")
  }, [code])

  const IS_CURRENT_USER = fcl.withPrefix(user.addr) === fcl.withPrefix(params.address)

  if (!IS_CURRENT_USER) return <div>Sadly No</div>

  return (
    <Base sidebar={<SideBar />} header={<Header />} footer={<Footer code={code} name={name} />}>
      <Editor key="NEW_CONTRACT" name="NEW_CONTRACT" code={code} onChange={setCode} />
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
