import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #fff;
    --fg: #233445;
    --subtle: rgba(0,0,0,0.1);
    --hi: rgba(255,0,204,0.25);
    --mute: #78899a;
    --wow: #6600ff;
    --alt: #ff0066;
    --bad: tomato;
    --good: green;
    --font-family:"MonoLisa","JetBrains Mono","Fira Code",monospace;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #232323;
      --fg: #ababab;
      --mute: #787878;
      --wow: #ff00cc;
      --alt: #cc00ff;
      --bad: tomato;
      --good: lime;
      --hi: rgba(66,0,255,0.25);
      --subtle: rgba(255,255,255,0.1);
    }
  }

  ::selection {
    background: var(--fg);
    color: var(--bg);
  }

  html, body {
    border:0;
    margin:0;
    font-family: var(--font-family);
    background: var(--bg);
    color: var(--fg);
  }

  progress {
    -webkit-appearance: none;
    background: var(--fg);
    color: blue;
  }

  label > input {
    margin-right: 0.75em;
  }
`
