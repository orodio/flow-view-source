import React from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import {RecoilRoot} from "recoil"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {MainnetConfig} from "./config/mainnet-config.comp"
import {TestnetConfig} from "./config/testnet-config.comp"
import {SandboxConfig} from "./config/sandboxnet-config.comp"
import {CanarynetConfig} from "./config/canarynet-config.comp"
import {GlobalStyles} from "./styles/global"

import Account from "./pages/account"
import AccountContract from "./pages/account/contract"
import AccountContractNew from "./pages/account/contract-new"
import AccountKeys from "./pages/account/keys"
import {TxStatus} from "./pages/tx-status.comp"
import {Event} from "./pages/event.comp"
import {Status} from "./pages/status.comp"

import {Default} from "./comps/default"

window.fcl = fcl
window.t = fcl.t
window.query = fcl.query
window.mutate = fcl.mutate
window.config = fcl.config
window.currentUser = fcl.currentUser

fcl.currentUser().subscribe(user => console.log("Current User", user))
window.addEventListener("FLOW::TX", d => console.log(d.type, d.detail.delta + "ms", d.detail.txId))

window.xform = (value, from, to) => {
  return Buffer.from(value, from).toString(to)
}

const NoMatch = () => <Default/>

// prettier-ignore
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <Router>
        <Route path="/mainnet/" component={MainnetConfig} />
        <Route path="/testnet/" component={TestnetConfig} />
        <Route path="/sandboxnet/" component={SandboxConfig} />
        <Route path="/canarynet/" component={CanarynetConfig} />
        <Switch>
          <Route exact path="/:env/account/Fx:address" component={Account} />
          <Route exact path="/:env/account/Fx:address/keys" component={AccountKeys}/>
          <Route exact path="/:env/account/Fx:address/contract/new" component={AccountContractNew} />
          <Route exact path="/:env/account/Fx:address/contract/:name" component={AccountContract} />

          <Route exact path="/:env/account/0x:address" component={Account} />
          <Route exact path="/:env/account/0x:address/keys" component={AccountKeys}/>
          <Route exact path="/:env/account/0x:address/contract/new" component={AccountContractNew} />
          <Route exact path="/:env/account/0x:address/contract/:name" component={AccountContract} />

          <Route exact path="/:env/tx/:txId" component={TxStatus} />
          <Route exact path="/:env/event/:eventKey" component={Event} />
          <Route exact path="/:env/status" component={Status} />

          <Route component={NoMatch} />
        </Switch>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)
