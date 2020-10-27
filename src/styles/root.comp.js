import styled, {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  html, body {
    border:0;
    margin:0;
    font-family:"MonoLisa","JetBrains Mono","Fira Code",monospace;
  }


`

const Foundation = styled.div`
  font-family: "MonoLisa", "JetBrains Mono", "Fira Code", monospace;
  color: #233445;
  font-size: 13px;
  padding: 21px 21px 34px 21px;
  border: 8px solid #233445;
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  box-sizing: border-box;
`

const Tag = styled.a`
  position: absolute;
  bottom: 0;
  right: 21px;
  background: tomato;
  font-family: inherit;
  font-size: 13px;
  line-height: 34px;
  font-weight: bold;
  color: #fff;
  padding: 0 21px;
  background: #233445;
  border-radius: 3px 3px 0 0;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    background: #ff0066;
    color: #233445;
  }
`

export function Root({children}) {
  return (
    <>
      <GlobalStyle />
      <Foundation>{children}</Foundation>
      <Tag href="https://www.patreon.com/qvvg" target="_blank" rel="noreferrer">
        qvvg
      </Tag>
    </>
  )
}
