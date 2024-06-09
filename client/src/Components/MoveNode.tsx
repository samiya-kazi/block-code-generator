import { Handle, Position } from 'reactflow';
import close from '../assets/close.svg';
import { useContext } from 'react';
import FlowContext from '../Context/FlowContext';

function MoveNode({ id, data }: { id: string, data: { label: string, steps?: number }}) {

  const ctx = useContext(FlowContext);

  return (
    <div className="base-node">
      <div className="node-btn-container"><img className="close-btn" src={close} onClick={() => ctx.removeNode(id)} /></div>
      <div style={{ padding: '10px 20px', height: '2rem' }}>
        <span>Move </span>
        <input type="number" onChange={(e) => data.steps = Number(e.target.value)} />
        <span> steps</span>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default MoveNode