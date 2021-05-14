import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import "./Game.css"

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        instructions: "",
        max_players: 0,
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="instructions">How to Play: </label>
                    <input type="text" name="instructions" required autoFocus className="form-control"
                        value={currentGame.instructions}
                        onChange={changeGameState}
                    />
                    <label htmlFor="max_players">How Many Players: </label>
                    <input type="text" name="max_players" required autoFocus className="form-control"
                        value={currentGame.max_players}
                        onChange={changeGameState}
                    />
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0">Select a game...</option>
                        {
                            gameTypes.map(gametype => (
                                <option>{gametype.label}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        instructions: currentGame.instructions,
                        max_players: parseInt(currentGame.max_players),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}