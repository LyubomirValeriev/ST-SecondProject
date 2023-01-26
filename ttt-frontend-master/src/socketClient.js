import { io } from 'socket.io-client'

const socket = io('http://localhost:8086/game')

export const joinRoom = (roomId) => {
  socket.emit('JOIN_ROOM', roomId)
}

export const onGameState = (listener) => {
  socket.on('GAME_STATE', listener)
}

export const offGameState = (listener) => {
  socket.off('GAME_STATE', listener)
}

export const playMove = (mockMovePlayedEventArgs) => {
  socket.emit('MOVE_PLAYED', mockMovePlayedEventArgs)
}

export const sendMessage = (msgObj) => {
  socket.emit('SENT_MESSAGE', msgObj)
}

export const onMessageReceived = (listener) => {
  socket.on('CHAT_UPDATE', listener)
}

export const offMessageReceived = (listener) => {
  socket.off('CHAT_UPDATE', listener)
}
