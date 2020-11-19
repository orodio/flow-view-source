import styled, {css} from "styled-components"
import {useEffect, useState} from "react"

export const H1 = styled.h1`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 13px;
  }
`
export const H2 = styled.h2`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 13px;
  }
`
export const H3 = styled.h3`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 13px;
  }
`

export const Muted = styled.span`
  color: var(--mute);
`

export const Good = styled.span`
  color: green;
  font-weight: bold;
`

export const Bad = styled.span`
  color: tomato;
  font-weight: bold;
`

export const Pre = styled.pre`
  padding: 5px;
  margin-left: 5px;
  position: relative;
  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 5px;
    background: var(--mute);
    right: 100%;
    top: 0;
    bottom: 0;
    border-radius: 3px;
  }
`

export const Json = ({children}) => {
  return <Pre>{JSON.stringify(children, null, 2)}</Pre>
}

export const List = styled.ul``
export const Li = styled.li`
  margin-bottom: 3px;
`

export const ListItem = ({label, value, children}) => {
  return (
    <Li>
      <div style={{display: "flex"}}>
        {label != null && <Muted style={{marginRight: "8px"}}>{label}:</Muted>}
        {value != null && <strong>{value}</strong>}
      </div>
      {children}
    </Li>
  )
}

export const Details = styled.div`
  display: flex;
`
const Det = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 13px;
  & + & {
    border-left: 1px solid var(--mute);
    padding-left: 13px;
  }
`
export const Detail = ({label, value}) => {
  return (
    <Det>
      <strong>{value}</strong>
      <small>{label}</small>
    </Det>
  )
}

const Ascii = styled.pre`
  margin: 0;
  font-weight: bold;
`

export const Dance = ({a, b}) => {
  const [state, setState] = useState(a)
  useEffect(() => {
    const interval = setInterval(() => {
      setState((state) => (state === a ? b : a))
    }, 500)
    return () => clearInterval(interval)
  }, [a, b])
  return <Ascii>{state}</Ascii>
}

const defaultRoll = [
  "[*     ]",
  "[ *    ]",
  "[  *   ]",
  "[   *  ]",
  "[    * ]",
  "[     *]",
  "[    * ]",
  "[   *  ]",
  "[  *   ]",
  "[ *    ]",
  "[*     ]",
]

export const Roll = ({seq = defaultRoll, label}) => {
  const [i, set] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      set((state) => {
        var next = state + 1
        return next >= seq.length ? 0 : next
      })
    }, seq.length * 15)
    return () => clearInterval(interval)
  })
  return (
    <Ascii>
      {seq[i]}
      {label && " " + label}
    </Ascii>
  )
}

export const Button = styled.button`
  cursor: pointer;
  background: var(--fg);
  color: var(--bg);
  border: none;
  border-radius: 3px;
  font-size: 13px;
  line-height: 34px;
  padding: 0 21px;

  ${(p) =>
    p.disabled
      ? css`
          background: var(--mute);
          color: var(--fg);
          cursor: default;
        `
      : css`
          &:hover,
          &:focus {
            background: var(--wow);
          }
        `}
`
