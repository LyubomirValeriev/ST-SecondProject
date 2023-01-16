import React, { useEffect, useState } from 'react'
import { createGame, fetchOnlineUsers } from '../api'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { getLocalUser } from '../localStore'

const Players = () => {
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    updateOnlineUsersList().catch((e) => console.error(e))
    const interval = setInterval(updateOnlineUsersList, 3 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const updateOnlineUsersList = async () => {
    const fetchedOnlineUsers = await fetchOnlineUsers()
    setOnlineUsers(Object.values(fetchedOnlineUsers))
  }

  return (
    <div className='players'>
      <h2>Online Players</h2>
      <List>
        {onlineUsers.map((user) => (
          <ListItemButton
            style={{ margin: '.5rem', alignItems: 'center', textAlign: 'center', border: '2px solid #abcdef', borderRadius: '50px' }}
            key={user.id}
            onClick={async () => {
              const localUserId = getLocalUser().id
              const invitedUserId = user.id
              if (localUserId !== invitedUserId) createGame([localUserId, invitedUserId]).catch((e) => console.error(e))
            }}
          >
            <ListItemText primary={user.username} />
          </ListItemButton>
        ))}
      </List>
    </div>
  )
}

export default Players
