import styled, {css} from "styled-components"

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--subtle);
  max-height: 100%;
`

const Header = styled.div`
  border-bottom: 1px solid var(--subtle);
`
const Footer = styled.div`
  border-top: 1px solid var(--subtle);
`
const Scroll = styled.div`
  overflow: scroll;
  flex: 1;
  width: 240px;
`

const Inner = styled.div`
  font-size: 13px;
  padding: 8px;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const GroupStyle = styled.div``

const GroupBody = styled.div`
  position: relative;
`

const GroupTitle = styled.div`
  font-weight: bold;
  margin-right: 34px;
  font-size: 13px;
  line-height: 34px;
  display: block;

  & + ${GroupBody} {
    padding-left: 7px;
    margin-left: 10px;
  }

  & + ${GroupBody}:after {
    position: absolute;
    top: -3px;
    bottom: -3px;
    right: 100%;
    width: 5px;
    background: var(--subtle);
    display: block;
    border-radius: 3px;
    content: "";
  }

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  ${p =>
    p.onClick || p.href || p.to
      ? css`
          cursor: pointer;
          color: inherit;
          text-decoration: none;

          &:hover,
          &:focus {
            color: var(--wow);
          }
        `
      : css`
          cursor: default;
        `}
`
const Icon = styled.i`
  margin-right: 5px;
`

const ItemRoot = styled.div`
  font-size: 13px;
  line-height: 21px;
  margin-right: 21px;

  background: none;
  border: none;
  padding: 0px;
  display: block;
  font-family: var(--font-family);

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  ${p =>
    p.onClick || p.href || p.to
      ? css`
          cursor: pointer;
          color: inherit;
          text-decoration: none;

          &:hover,
          &:focus {
            color: var(--wow);
          }
        `
      : css`
          cursor: default;
        `}

  & + & {
    margin-top: 3px;
  }

  &.active {
    color: var(--alt);
    font-weight: bold;
    cursor: default;
  }
`

export const HR = styled.hr`
  border: none;
  height: 5px;
  border-radius: 3px;
  background: var(--subtle);
  margin: 8px 55px 8px 0;
`

export function Group({title = null, icon = null, as = null, children, ...rest}) {
  return (
    <GroupStyle>
      {title && (
        <GroupTitle as={as} {...rest}>
          <span>
            {icon && <Icon className={`fas fa-fw fa-${icon}`} />}
            {title}
          </span>
        </GroupTitle>
      )}
      <GroupBody>{children}</GroupBody>
    </GroupStyle>
  )
}

export function Item({icon = null, as = null, children, ...rest}) {
  return (
    <ItemRoot as={as} {...rest}>
      <span>
        {icon && <Icon className={`fas fa-fw fa-${icon}`} />}
        {children}
      </span>
    </ItemRoot>
  )
}

export function SideBar({header = null, footer = null, children}) {
  return (
    <Root>
      {header && <Header>{header}</Header>}
      <Scroll>
        <Inner>{children}</Inner>
      </Scroll>
      {footer && <Footer>{footer}</Footer>}
    </Root>
  )
}
