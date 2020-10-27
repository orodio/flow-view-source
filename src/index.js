import "./styles/prism.css"
import React from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {MainnetConfig} from "./config/mainnet-config.comp"
import {TestnetConfig} from "./config/testnet-config.comp"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {Account} from "./pages/account.comp"
import {TxStatus} from "./pages/tx-status.comp"
import {Event} from "./pages/event.comp"

window.fcl = fcl
window.t = t

const NoMatch = () => <div>Sadly No</div>

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/mainnet/" component={MainnetConfig} />
      <Route path="/testnet/" component={TestnetConfig} />
      <Switch>
        <Route exact path="/mainnet/account/Fx:address" component={Account} />
        <Route exact path="/testnet/account/Fx:address" component={Account} />

        <Route exact path="/mainnet/account/0x:address" component={Account} />
        <Route exact path="/testnet/account/0x:address" component={Account} />

        <Route exact path="/mainnet/tx/:txId" component={TxStatus} />
        <Route exact path="/testnet/tx/:txId" component={TxStatus} />

        <Route exact path="/mainnet/event/:eventKey" component={Event} />
        <Route exact path="/testnet/event/:eventKey" component={Event} />

        <Route component={NoMatch} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
