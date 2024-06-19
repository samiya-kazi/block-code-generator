import { Handle, Position } from 'reactflow';
import close from '../../assets/close.svg';
import turnRight from '../../assets/turn-right.svg';
import { useContext } from 'react';
import FlowContext from '../../Context/FlowContext';

function TurnNode({ id, data, selected }: { id: string, data: { label: string, level: number, direction?: string }, selected: boolean }) {

  const ctx = useContext(FlowContext);
  
  return (
    <div className={"base-node flex turn-node" + (selected ? " selected-node" : "")} style={{ width: (270 - (20 * data.level))}}>
      <div className='node-icon flex-center'><img src={turnRight} /></div>
      <div className='node-info'>
        <span>Turn </span>
        <select className='select-input' onChange={(e) => data.direction = e.target.value}>
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
        </select>
      </div>
      <div className="close-btn-container"><img className="close-btn" src={close} onClick={() => ctx.removeNode(id)} /></div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default TurnNode