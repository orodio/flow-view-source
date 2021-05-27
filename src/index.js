import React from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {RecoilRoot} from "recoil"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {MainnetConfig} from "./config/mainnet-config.comp"
import {TestnetConfig} from "./config/testnet-config.comp"
import {CanarynetConfig} from "./config/canarynet-config.comp"
import {GlobalStyles} from "./styles/global"

import Account from "./pages/account"
import AccountContract from "./pages/account/contract"
import AccountContractNew from "./pages/account/contract-new"
import AccountKeys from "./pages/account/keys"
import {TxStatus} from "./pages/tx-status.comp"
import {Event} from "./pages/event.comp"
import {Status} from "./pages/status.comp"
import {Seed} from "./pages/seed.comp"

window.fcl = fcl
window.t = t
fcl.currentUser().subscribe(user => console.log("Current User", user))
window.addEventListener("FLOW::TX", d => console.log(d.type, d.detail.delta + "ms", d.detail.txId))

window.xform = (value, from, to) => {
  return Buffer.from(value, from).toString(to)
}

const NoMatch = () => <div>Sadly No</div>

// prettier-ignore
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <Router>
        <Route path="/mainnet/" component={MainnetConfig} />
        <Route path="/testnet/" component={TestnetConfig} />
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

          <Route exact path="/mainnet/tx/:txId" component={TxStatus} />
          <Route exact path="/testnet/tx/:txId" component={TxStatus} />
          <Route exact path="/carnarynet/tx/:txId" component={TxStatus} />

          <Route exact path="/mainnet/event/:eventKey" component={Event} />
          <Route exact path="/testnet/event/:eventKey" component={Event} />
          <Route exact path="/canarynet/event/:eventKey" component={Event} />

          <Route exact path="/mainnet/status" component={Status} />
          <Route exact path="/testnet/status" component={Status} />
          <Route exact path="/canarynet/status" component={Status} />

          <Route exact path="/testnet/seed" component={Seed} />

          <Route component={NoMatch} />
        </Switch>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)

// <Route exact path="/mainnet/account/Fx:address" component={Account} />
// <Route exact path="/testnet/account/Fx:address" component={Account} />
// <Route exact path="/mainnet/account/0x:address" component={Account} />
// <Route exact path="/testnet/account/0x:address" component={Account} />
