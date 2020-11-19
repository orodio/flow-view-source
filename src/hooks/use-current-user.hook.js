import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

export function useCurrentUser() {
  const [user, setUser] = useState({addr: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  return [user, user.addr != null]
}
