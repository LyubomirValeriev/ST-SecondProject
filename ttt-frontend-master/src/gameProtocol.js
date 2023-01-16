export const mockGameStateEventArgs = {
  id: '',
  players: [
    { id: '', username: '', piece: 'X' },
    { id: '', username: '', piece: 'O' },
  ],
  playerTurn: '',
  state: 'STARTED',
  board: [9, 9, 9, 9, 9, 9, 9, 9, 9],
  winner: null,
}

export const mockMovePlayedEventArgs = {
  gameId: '',
  playerId: '',
  move: { piece: 'X', position: 5 },
}
