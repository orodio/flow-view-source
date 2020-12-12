import styled from "styled-components"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/mode-rust"

const noop = () => {}

const Styles = styled.div`
  .ace-github {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-family);

    .ace_cursor {
      color: var(--wow);
    }

    .ace_gutter {
      background: var(--bg);
      color: var(--mute);
    }

    .ace_line {
      color: var(--fg);
    }

    .ace_keyword {
      color: var(--wow);
      font-weight: bold;
    }

    .ace_paren {
      color: var(--bad);
    }

    .ace_operator {
      color: var(--alt);
    }

    .ace_constant {
      color: var(--wow);
    }

    .ace_punctuation {
      color: var(--good);
    }

    .ace_comment {
      color: var(--mute);
      font-style: normal;
      opacity: 0.75;
    }

    .ace_marker-layer {
      .ace_active-line {
        background: var(--hi);
      }

      .ace_selection {
        background: var(--hi);
      }

      .ace_bracket {
        border: 1px solid var(--wow);
      }
    }
  }
`

export function Editor({code = "", onChange = noop, name = "RAWR"}) {
  return (
    <Styles>
      <AceEditor
        width="100%"
        height={`${((code || "").split("\n").length + 5) * 14}px`}
        mode="rust"
        theme="github"
        value={code}
        onChange={onChange}
        name={name}
        tabSize={2}
        highlightActiveLine={false}
        showPrintMargin={false}
        setOptions={{
          displayIndentGuides: false,
        }}
        placeholder="..."
      />
    </Styles>
  )
}
