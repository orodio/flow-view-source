import {useEffect} from "react"
import {atom, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"

export const currentUser = atom({
  key: "CURRENT_USER",
  default: {addr: null, cid: null, loggedIn: false},
})

export function useCurrentUser() {
  const [$data, setData] = useRecoilState(currentUser)
  useEffect(() => fcl.currentUser().subscribe(setData), [setData])

  const user = {
    logIn: fcl.logIn,
    logOut: fcl.unauthenticate,
    signUp: fcl.signUp,
    changeUser: fcl.reauthenticate,
    ...$data,
  }

  return user
}
