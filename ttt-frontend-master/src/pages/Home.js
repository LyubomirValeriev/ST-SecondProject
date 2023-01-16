import React, { useEffect, useState } from 'react'
import { localUserExists, getLocalUser } from '../localStore'
import { sendHeartbeat, getStartedGame } from '../api'
import { ChangeUsernameButton } from '../components/ChangeUsernameButton'
import Players from '../components/Players'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  const updateUserHeartbeat = () => {
    if (localUserExists()) {
      const user = getLocalUser()
      sendHeartbeat(user).catch((e) => console.error(e))
    }
  }
  const pollForStartedGame = () => {
    const playerId = getLocalUser().id
    getStartedGame(playerId)
      .then((data) => {
        if (data) {
          navigate(`/game/${data.gameId}`)
        }
      })
      .catch((e) => console.error(e))
  }
  useEffect(() => {
    updateUserHeartbeat()
    const heartbeatIntervalId = setInterval(updateUserHeartbeat, 15 * 100)
    const gamedIntervalId = setInterval(pollForStartedGame, 3 * 1000)
    return () => {
      clearInterval(heartbeatIntervalId)
      clearInterval(gamedIntervalId)
    }
  }, [])

  return (
    <div className='App'>
      <header>
        <div></div>
        <h1>Tic-Tac-Toe</h1>
        <div className='user'>
          <h3 className='userName'>{username}</h3>
          <ChangeUsernameButton
            onNameChange={(newUsername) => {
              setUsername(newUsername)
            }}
          />
        </div>
      </header>
      <div className='content'>
        <Players />
      </div>
    </div>
  )
}
