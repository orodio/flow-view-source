// DEPRECATED PLEASE USE ./use-current-user.js
// DEPRECATED PLEASE USE ./use-current-user.js
// DEPRECATED PLEASE USE ./use-current-user.js

import {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

export function useCurrentUser() {
  const [user, setUser] = useState({addr: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  return [user, user.addr != null]
}
