import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { joinRoom, offGameState, onGameState, playMove } from '../socketClient.js'
import Board from '../components/Board'
import Info from '../components/Info'
import { getLocalUser } from '../localStore'
import ReactConfetti from 'react-confetti'
import { Alert, Button } from '@mui/material'

export const Game = () => {
  const [board, setBoard] = useState([9, 9, 9, 9, 9, 9, 9, 9, 9])
  const [info, setInfo] = useState({ players: ['', ''], playerTurn: '' })
  const [winner, setWinner] = useState(null)
  const [winnerName, setWinnerName] = useState('')
  const [isFinished, setFinished] = useState(false)
  const { gameId } = useParams()
  const navigate = useNavigate()
  const callback = useCallback(({ board, players, playerTurn, state, winner }) => {
    setBoard(board)
    setInfo({ players, playerTurn })
    setFinished(state === 'FINISHED')
    setWinner(winner)
    if (winner) setWinnerName(winner === players[0]?.id ? players[0]?.username : players[1]?.username)
  }, [])

  useEffect(() => {
    onGameState(callback)
    joinRoom(gameId)
    return () => {
      offGameState(callback)
    }
  }, [])

  return (
    <div className='App'>
      {isFinished && winner != null && <ReactConfetti recycle={false} />}
      <header>
        <div></div>
        <h1>Tic-Tac-Toe</h1>
        <div className='button'>
          {isFinished && (
            <Button
              variant='outlined'
              onClick={() => {
                navigate('/')
              }}
            >
              Go back to 🏠
            </Button>
          )}
        </div>
      </header>
      <div className='finishedGame'>
        <Alert style={{ visibility: isFinished ? 'visible' : 'hidden' }} severity={winner != null ? 'success' : 'info'}>
          {winner == null ? 'The game is a Draw! 🎨' : `${winnerName} won! 🎉`}
        </Alert>
      </div>
      <div className='boardDisplay'>
        {board && (
          <Board
            board={board}
            movePlayed={(btnIndex) => {
              const [firstPlayer, secondPlayer] = info.players
              const piece = firstPlayer.id === getLocalUser().id ? firstPlayer.piece : secondPlayer.piece
              playMove({
                gameId,
                playerId: getLocalUser().id,
                move: { piece, position: btnIndex },
              })
            }}
          />
        )}
      </div>
      <div className='infoDisplay'>{info && <Info data={info} />}</div>
    </div>
  )
}
