import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import {useParams} from "react-router-dom"
import {Root} from "../styles/root.comp"
import {H1, Muted} from "../styles/text.comp"

export function Event() {
  const {eventKey} = useParams()
  const [events, setEvents] = useState([])
  useEffect(
    () =>
      fcl.events(eventKey).subscribe((event) => {
        setEvents((oldEvents) => [...oldEvents, event])
      }),
    [eventKey]
  )

  return (
    <Root>
      <H1>
        <Muted>Events: </Muted>
        <span>{eventKey}</span>
      </H1>
      <h3>Events</h3>
      <ul>
        <li>
          <Muted>Oldest</Muted>
        </li>
        {!events.length && (
          <li>
            <strong>No Events Yet</strong>
          </li>
        )}
        {events.map((d, i) => {
          return (
            <li key={i}>
              <pre>{JSON.stringify(d, null, 2)}</pre>
            </li>
          )
        })}

        <li>
          <Muted>Newest</Muted>
        </li>
      </ul>
    </Root>
  )
}
