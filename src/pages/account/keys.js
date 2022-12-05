import * as fcl from "@onflow/fcl"
import {useParams} from "react-router-dom"
import {Base} from "../../comps/base"
import {Bad} from "../../styles/text.comp"
import {Wat} from "../../comps/wat"
import {SideBar} from "./sidebar"
import {Group, Item} from "../../comps/sidebar"
import {useAccountKeys} from "../../hooks/use-account-keys"

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
          to: `/${env}/account/${fcl.withPrefix(address)}`,
          label: fcl.withPrefix(address),
        },
        {label: "keys", to: `/${env}/account/${fcl.withPrefix(address)}/keys`},
      ]}
    />
  )
}

const fmtCurve = i =>
  ({
    1: "ECDSA_P256",
    2: "ECDSA_secp256k1",
  }[i] || "--")

const fmtHash = i =>
  ({
    1: "SHA2_256",
    3: "SHA3_256",
  }[i] || "--")

export function Page() {
  const {address} = useParams()
  const keys = useAccountKeys(address)

  console.log('key ->', keys)

  return (
    <Base sidebar={<SideBar />} header={<Header />}>
      <div style={{padding: "13px"}}>
        {(keys || []).map(key => (
          <Group title={key.publicKey} icon="key" key={key.index}>
            {key.revoked && (
              <Item icon="folder-times">
                <Bad>REVOKED</Bad>
              </Item>
            )}
            <Item icon="hashtag">KeyId: {key.index}</Item>
            <Item icon="weight-hanging">Weight: {key.weight}/1000</Item>
            <Item icon="wave-sine">Curve: {fmtCurve(key.signAlgo)}</Item>
            <Item icon="blender">Hash: {fmtHash(key.hashAlgo)}</Item>
            <Item icon="dna">Sequence Number: {key.sequenceNumber}</Item>
          </Group>
        ))}
      </div>
    </Base>
  )
}

export default function WrappedPage() {
  return <Page />
}
