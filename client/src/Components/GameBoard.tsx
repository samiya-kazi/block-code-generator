import BoardSpace from './BoardSpace'

const board = Array(5).fill(0).map(row => Array(5).fill(1));

function GameBoard() {
  return (
    <div>
      {board.map((row, x) => <div className='board-row'>
        {row.map((_, y) => <BoardSpace x={x} y={y} />)}
      </div>)}
    </div>
  )
}

export default GameBoard