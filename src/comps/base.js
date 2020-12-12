import styled from "styled-components"

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
  display: flex;
  font-size: 13px;
  align-items: stretch;
`

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  max-width: 100%;
`

const Header = styled.div`
  border-bottom: 1px solid var(--subtle);
`
const Footer = styled.div`
  border-top: 1px solid var(--subtle);
`
const Scroll = styled.div`
  flex: 1;
  overflow: scroll;
`

export function Base({sidebar = null, header = null, footer = null, children}) {
  return (
    <Root>
      {sidebar && <SideBar>{sidebar}</SideBar>}
      <Main>
        {header && <Header>{header}</Header>}
        <Scroll>{children}</Scroll>
        {footer && <Footer>{footer}</Footer>}
      </Main>
    </Root>
  )
}
