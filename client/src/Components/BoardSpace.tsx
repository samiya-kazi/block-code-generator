import { useContext } from "react";
import robot from '../assets/robot.svg'
import FlowContext from "../Context/FlowContext";


function BoardSpace({ x, y }: { x: number, y: number}) {

  const context = useContext(FlowContext);

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