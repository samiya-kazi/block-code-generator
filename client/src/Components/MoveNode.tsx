import { Handle, Position } from 'reactflow';
import close from '../assets/close.svg';
import { useContext } from 'react';
import FlowContext from '../Context/FlowContext';
import run from '../assets/run.svg';

function MoveNode({ id, data, selected }: { id: string, data: { label: string, level: number, steps?: number }, selected: boolean}) {

  const ctx = useContext(FlowContext);

  return (
    <div className={"base-node flex move-node" + (selected ? " selected-node" : "")} style={{ width: (270 - (20 * data.level))}}>
      <div className='node-icon flex-center'><img src={run} /></div>
      <div className='node-info' style={{ padding: '10px 20px', height: '2rem', flexGrow: 1 }}>
        <span>Move </span>
        <input type="number" className='num-input' onChange={(e) => data.steps = Number(e.target.value)} />
        <span> steps</span>
      </div>
      <div className='close-btn-container'><img className="close-btn" src={close} onClick={() => ctx.removeNode(id)} /></div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default MoveNode