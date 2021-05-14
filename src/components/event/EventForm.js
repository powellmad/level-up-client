import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"

export const EventForm = () => {
    const { events, createEvent, getEvents } = useContext(EventContext)
    const { games, getGames } = useContext(GameContext)

    const history = useHistory()
    const [ currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getEvents()
        .then(getGames)
    }, [])

    const changeEventState = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setCurrentEvent(newEventState)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />

                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const newEvent = {
                        description: currentEvent.description,
                        gameId: parseInt(currentEvent.gameId),
                        date: parseInt(currentEvent.date),
                        time: parseInt(currentEvent.time),
                        // organizer: parseInt(event.user)
                    }

                    // Create the event
                    createEvent(newEvent)
                        .then(() => history.push("/events"))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}