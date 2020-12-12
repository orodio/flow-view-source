import {Suspense} from "react"
import {useParams} from "react-router-dom"
import {Base} from "../../comps/base"
import {withPrefix} from "@onflow/fcl"
import {useAccount} from "../../hooks/use-account"
import {Wat} from "../../comps/wat"
import {SideBar} from "./sidebar"
import {Group, Item, Icon} from "../../comps/sidebar"

const Header = () => {
  const {env, address} = useParams()

  return (
    <Wat
      icon="piano"
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
        {label: "keys", to: `/${env}/account/${withPrefix(address)}/keys`},
      ]}
    />
  )
}

const fmtCurve = i =>
  ({
    2: "ECDSA_P256",
    3: "ECDSA_secp256k1",
  }[i] || "--")

const fmtHash = i =>
  ({
    1: "SHA2_256",
    3: "SHA3_256",
  }[i] || "--")

export function Page() {
  const {address} = useParams()
  const acct = useAccount(address)

  console.log("ACCOUNT", acct)

  return (
    <Base sidebar={<SideBar />} header={<Header />}>
      <div style={{padding: "13px"}}>
        {acct.keys.map(key => (
          <Group title={key.publicKey} icon="key">
            <Item icon="hashtag">KeyId: {key.index}</Item>
            <Item icon="weight-hanging">Weight: {key.weight}/1000</Item>
            <Item icon="wave-sine">Curve: {fmtCurve(key.signAlgo)}</Item>
            <Item icon="blender">Hash: {fmtHash(key.hashAlgo)}</Item>
          </Group>
        ))}
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
