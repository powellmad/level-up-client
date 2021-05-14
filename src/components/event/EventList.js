import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { useHistory } from 'react-router-dom'
import "./Event.css"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Create New Event</button>
            {
                events.map(event => {
                    return <section key={event.id} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__game">{event.game.title}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {event.time}
                        </div>
                    </section>
                })
            }
        </article >
    )
}
