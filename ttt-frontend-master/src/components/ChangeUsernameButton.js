import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { getLocalUser, updateLocalUsername, localUserExists, updateLocalId } from '../localStore'
import { sendHeartbeat } from '../api'

export const ChangeUsernameButton = ({ onNameChange }) => {
  const [open, setOpen] = useState(false)

  const [usernameInput, setUsernameInput] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateUserData = async () => {
    updateLocalUsername(usernameInput)
    onNameChange(usernameInput)
    await sendHeartbeat(getLocalUser())
  }

  useEffect(() => {
    if (localUserExists()) {
      const { username } = getLocalUser()
      onNameChange(username)
    } else {
      updateLocalId()
      handleOpen()
    }
  }, [])

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen}>
        Change
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='username'
            label='Username'
            value={usernameInput}
            type='text'
            fullWidth
            variant='standard'
            onChange={(e) => {
              setUsernameInput(e.target.value)
            }}
            required
            placeholder='Enter your username'
          />
        </DialogContent>
        <DialogActions>
          <Button
            type='submit'
            onClick={async () => {
              await updateUserData()
              handleClose()
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
