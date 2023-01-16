import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { printPiece } from '../utils'

const Info = ({ data }) => {
  const { players, playerTurn } = data
  const [firstPlayer, secondPlayer] = players

  return (
    <div className='info'>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>{firstPlayer.username}</TableCell>
              <TableCell align='right'>{secondPlayer.username}</TableCell>
              <TableCell align='right'>Player Turn</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                {printPiece(firstPlayer.piece)}
              </TableCell>
              <TableCell align='right'>{printPiece(secondPlayer.piece)}</TableCell>
              <TableCell align='right'>{playerTurn === firstPlayer.id ? firstPlayer.username : secondPlayer.username}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Info
