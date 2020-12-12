import styled, {css} from "styled-components"

const BaseIcon = styled.i`
  font-size: 32px;
`

export const Pad = styled.span`
  padding: 0 21px;

  ${BaseIcon} + & {
    padding-left: 13px;
  }

  & + ${BaseIcon} {
    margin-left: -8px;
  }
`

export const Button = styled.button`
  ${p => p.fill && "flex: 1;"}
  ${p => (p.circle ? "border-radius: 100%;" : "border-radius: 3px;")}

  background: var(--wow);
  color: var(--bg);
  font-family: var(--font-family);
  font-size: 13px;
  line-height: 34px;
  font-weight: bold;
  box-sizing: border-box;
  border: 3px solid var(--wow);
  cursor: pointer;
  padding: 0;

  &:focus,
  &:active,
  &:hover {
    background: var(--alt);
    border-color: var(--alt);
  }

  & > ${BaseIcon} {
    font-size: 21px;
    width: 34px;
    transform: translateY(3px);
  }

  ${p =>
    p.subtle &&
    css`
      background: var(--bg);
      color: var(--mute);
      border-color: var(--mute);

      &:focus,
      &:active,
      &:hover {
        background: var(--bg);
        color: var(--wow);
        border-color: var(--wow);
      }
    `}

  ${p =>
    p.disabled &&
    css`
      background: var(--subtle);
      color: var(--mute);
      border-color: var(--subtle);

      &:focus,
      &:active,
      &:hover {
        background: var(--bg);
        color: var(--wow);
        border-color: var(--wow);
      }
    `}
`

export const Input = styled.input`
  line-height: 34px;
  padding: 0 13px;
  border: 3px solid var(--mute);
  border-radius: 3px;
  font-family: var(--font-family);

  &:focus {
    border: 3px solid var(--wow);
  }
`

export const Bar = styled.div`
  display: flex;
  padding: 13px;
  align-items: center;

  ${p =>
    p.reverse
      ? css`
          flex-direction: row-reverse;
          & > * + * {
            margin-right: 8px;
          }
        `
      : css`
          & > * + * {
            margin-left: 8px;
          }
        `}
`

export const Icon = ({icon}) => <BaseIcon className={`fas fa-fw fa-${icon}`} />

export const Label = styled.div`
  text-decoration: none;
  font-weight: bold;
  color: var(--fg);
  line-height: 40px;

  ${p =>
    p.onClick || p.href || p.to
      ? css`
          &:hover,
          &:focus,
          &:active {
            color: var(--wow);
            cursor: pointer;
          }
        `
      : css`
          cursor: default;
        `}
`
