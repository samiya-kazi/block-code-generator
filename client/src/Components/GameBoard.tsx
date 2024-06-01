import BoardSpace from './BoardSpace'

const board = Array(5).fill(0).map(_ => Array(5).fill(1));

function GameBoard() {
  return (
    <div>
      {board.map((row, x) => <div key={`board-row-${x}`} className='board-row'>
        {row.map((_, y) => <BoardSpace key={`space-${x}-${y}`} x={x} y={y} />)}
      </div>)}
    </div>
  )
}

export default GameBoard