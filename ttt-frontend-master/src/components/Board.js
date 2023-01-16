import React from 'react'
import { Button } from '@mui/material'
import { printPiece } from '../utils'

const Board = ({ board: propBoard, movePlayed }) => {
  const board = [
    [propBoard[0], propBoard[1], propBoard[2]],
    [propBoard[3], propBoard[4], propBoard[5]],
    [propBoard[6], propBoard[7], propBoard[8]],
  ]

  return (
    <div className='board'>
      {board.map((row, indexRow) => (
        <div key={indexRow} className='row'>
          {row.map((piece, indexPiece) => {
            const btnIndex = indexRow * 3 + indexPiece
            return (
              <Button key={btnIndex} id='board-btn' className='boardButtons' onClick={() => movePlayed(btnIndex)}>
                {printPiece(piece)}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Board
