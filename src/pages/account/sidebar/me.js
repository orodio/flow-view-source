import {Suspense} from "react"
import * as fcl from "@onflow/fcl"
import {Bar, Icon, Button, Pad, Label} from "../../../comps/bar"
import {useParams, Link} from "react-router-dom"
import {useCurrentUser} from "../../../hooks/use-current-user"

function WithAuth() {
  const params = useParams()
  const user = useCurrentUser()
  const url = `/${params.env}/account/${user.addr}`

  return (
    <Bar>
      <Button circle as={Link} to={url}>
        <Icon icon="ghost" />
      </Button>
      <Label as={Link} to={url}>
        {user.addr}
      </Label>
    </Bar>
  )
}

function SansAuth() {
  return (
    <Bar>
      <Button fill onClick={fcl.authenticate}>
        <Pad>Authenticate</Pad>
        <Icon icon="ghost" />
      </Button>
    </Bar>
  )
}

function Loading() {
  return (
    <Bar>
      <Icon icon="circle-notch fa-spin" />
    </Bar>
  )
}

export function Me() {
  const user = useCurrentUser()
  return user.loggedIn ? <WithAuth /> : null
}

export function AltMe() {
  const user = useCurrentUser()
  return !user.loggedIn ? (
    <SansAuth />
  ) : (
    <Bar>
      <Button fill subtle onClick={fcl.unauthenticate}>
        <Pad>Sign Out</Pad>
        <Icon icon="sign-out-alt" />
      </Button>
    </Bar>
  )
}

export default function WrappedMe() {
  return (
    <Suspense fallback={<Loading />}>
      <Me />
    </Suspense>
  )
}
