import { useContext } from "react";
import robot from '../assets/robot.svg'
import BoardContext from "../Context/BoardContext"


function BoardSpace({ x, y }: { x: number, y: number}) {

  const context = useContext(BoardContext);


  return (
    <div className='board-space'>
      { x === context.currentPos.x && y === context.currentPos.y && 
        <div>
          <img src={robot} />
        </div>
      }
    </div>
  )
}

export default BoardSpace