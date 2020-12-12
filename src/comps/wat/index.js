import styled from "styled-components"
import {Link} from "react-router-dom"

const Line = styled.div`
  font-size: 13px;
  line-height: 40px;
  display: flex;
  padding: 13px;
  font-weight: bold;
  align-items: center;
`

const Del = styled.div`
  color: var(--subtle);
  font-weight: bold;
  margin-right: 5px;
`
const Mut = styled.div`
  color: var(--mute);
  text-decoration: none;
  margin-right: 5px;
`

const Par = styled(Link)`
  color: var(--fg);
  text-decoration: none;
  margin-right: 5px;

  &:hover,
  &:focus {
    color: var(--wow);
  }
`

const Icon = styled.i`
  margin-right: 5px;
`

export function Wat({icon = null, parts = []}) {
  return (
    <Line>
      {icon && (
        <>
          <Icon className={`fas fa-fw fa-${icon}`} />
          <Del>|</Del>
        </>
      )}
      {parts
        .map(({label, to}, i) =>
          to ? (
            <Par key={to} to={to}>
              {label}
            </Par>
          ) : (
            <Mut key={label + i}>{label}</Mut>
          )
        )
        .reduce((acc, par, i, arr) => {
          acc.push(par)
          if (i < arr.length - 1) acc.push(<Del key={i}>|</Del>)
          return acc
        }, [])}
    </Line>
  )
}
