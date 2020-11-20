import React from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {createGlobalStyle} from "styled-components"
import {MainnetConfig} from "./config/mainnet-config.comp"
import {TestnetConfig} from "./config/testnet-config.comp"

import {Account} from "./pages/account.comp"
import {TxStatus} from "./pages/tx-status.comp"
import {Event} from "./pages/event.comp"
import {Me} from "./pages/me.comp"
import {Status} from "./pages/status.comp"
import {Seed} from "./pages/seed.comp"
import {Ledger} from "./pages/ledger.comp"

window.fcl = fcl
window.t = t
fcl.currentUser().subscribe(user => console.log("Current User", user))

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #fff;
    --fg: #233445;
    --mute: #78899a;
    --wow: #6600ff;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #233445;
      --fg: #9aabbc;
      --mute: #78899a;
      --wow: #6600ff;
    }
  }

  html, body {
    background: var(--bg);
    color: var(--fg);
  }
`

const NoMatch = () => <div>Sadly No</div>

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
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

        <Route exact path="/mainnet/status" component={Status} />
        <Route exact path="/testnet/status" component={Status} />

        <Route exact path="/mainnet/me" component={Me} />
        <Route exact path="/testnet/me" component={Me} />

        <Route exact path="/testnet/seed" component={Seed} />

        <Route exact path="/mainnet/ledger" component={Ledger} />
        <Route exact path="/testnet/ledger" component={Ledger} />

        <Route component={NoMatch} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
