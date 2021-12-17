import styled from "styled-components"
import { useState } from "react"
import {H1, H2, Muted, Good} from "../styles/text.comp"

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg);
  color: var(--fg);
  box-sizing: border-box;
  border: 8px solid var(--fg);
  font-size: 13px;
  padding: 30px;

`

const Status = styled.a`
  color:inherit;
  text-decoration-color:green;
`

const P = styled.p`
  margin-bottom:2px;
`

export function Default() {
  const [environment, setEnvironment] = useState("testnet");
  const [account, setAccount] = useState("");
  const [tx, setTx] = useState("");
  const [event, setEvent] = useState("");
  
  return (
    <Root>
      <H1>flow-view-source</H1>
      <p>Select environment:</p>

      <label>
        <input type="radio" name="environment"
          defaultChecked={environment === "testnet"}
          onChange={() => setEnvironment("testnet")}
        />
        testnet <Status href="/testnet/status"><small><Good>STATUS</Good></small></Status>
      </label>
      <br/>
      <label>
        <input type="radio" name="environment"
          defaultChecked={environment === "mainnet"}
          onChange={() => setEnvironment("mainnet")}
        />
        mainnet <Status href="/mainnet/status"><small><Good>STATUS</Good></small></Status>
      </label>
      <br/>
      <label>
        <input type="radio" name="environment"
          defaultChecked={environment === "canarynet"}
          onChange={() => setEnvironment("canarynet")}
        />
        canarynet  <Status href="/canarynet/status"><small><Good>STATUS</Good></small></Status>
      </label>

      <div>

      <P><strong>Account</strong></P>
      <input type="text" placeholder="" onChange={event => setAccount(event.target.value)}/><button onClick={() => window.location = `${environment}/account/${account}`}>GO</button>
      
      <P><strong>Transaction</strong></P>
      <input type="text" placeholder="" onChange={event => setTx(event.target.value)}/><button onClick={() => window.location = `${environment}/tx/${tx}`}>GO</button>
      
      <P><strong>Event</strong></P>
      <input type="text" placeholder="" onChange={event => setEvent(event.target.value)}/><button onClick={() => window.location = `${environment}/event/${event}`}>GO</button>
      
      </div>
      
    </Root>
  )
}
