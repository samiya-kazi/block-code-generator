import { useContext } from "react"
import BoardContext from "../Context/BoardContext"


function BoardSpace({ x, y }: { x: number, y: number}) {

  const context = useContext(BoardContext);


  return (
    <div className='board-space'>
      { x === context.currentPos.x && y === context.currentPos.y && 'X'}
    </div>
  )
}

export default BoardSpace