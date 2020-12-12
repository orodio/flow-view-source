import {Component} from "react"
import {SideBar as Root} from "../../../comps/sidebar"

import Me, {AltMe} from "./me"
import Account from "./account"
import Contracts from "./contracts"

class Boop extends Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error}
  }

  componentDidCatch(error, errorInfo) {
    console.error("Boundary Error", errorInfo, error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export function SideBar() {
  return (
    <Boop>
      <Root header={<AltMe />} footer={<Me />}>
        <Account />
        <Contracts />
      </Root>
    </Boop>
  )
}
