import styled from "styled-components"

const Foundation = styled.div`
  font-family: "MonoLisa", "JetBrains Mono", "Fira Code", monospace;
  color: var(--fg);
  font-size: 13px;
  padding: 21px 21px 34px 21px;
  border: 8px solid var(--fg);
  margin: 0;
  min-height: 100vh;
  min-width: 100%;
  box-sizing: border-box;
`

// const Tag = styled.a`
//   position: absolute;
//   position: fixed;
//   bottom: 0;
//   right: 21px;
//   background: tomato;
//   font-family: inherit;
//   font-size: 13px;
//   line-height: 34px;
//   font-weight: bold;
//   color: var(--bg);
//   padding: 0 21px;
//   background: var(--fg);
//   border-radius: 3px 3px 0 0;
//   text-decoration: none;

//   &:hover,
//   &:focus,
//   &:active {
//     background: var(--wow);
//     color: var(--fg);
//   }
//   display: none;
// `

export function Root({children}) {
  return (
    <>
      <Foundation>{children}</Foundation>
    </>
  )
}
