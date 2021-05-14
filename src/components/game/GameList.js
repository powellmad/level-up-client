import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'
import "./Game.css"


export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()


    useEffect(() => {
        getGames()
    }, [])


    return (
        <article className="games">
            <h1>Games</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title}</div>
                        <div className="game__players">Players: {game.max_players}</div>
                        <div className="game__skillLevel">Skill Level: {game.skill_level}</div>
                        <div className="game__instructions">How to Play: {game.instructions}</div>
                    </section>
                })
            }
        </article>
    )
}