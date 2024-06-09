import { useContext } from 'react';
import { Handle, Position } from 'reactflow'
import FlowContext from '../Context/FlowContext';
import close from '../assets/close.svg';

function ForNode({ id, data }: {
  id: string,
  data: {
    label: string,
    level: number,
    times?: number
  }
}) {

  const ctx = useContext(FlowContext);

  const numOfChild = ctx.nodes.reduce((count, node) => node.parentId == id ? count + 1 : count, 0);

  return (
    <div className="base-node flex-col-center for-node" style={{ height: `${(numOfChild * 4) + 6}rem`, width: '15rem' }}>
      <div className="node-btn-container"><img className="close-btn" src={close}  onClick={() => ctx.removeNode(id)} /></div>
        <div className='flex-center'>
          <span>For </span>
          <input type="number" className='num-input' onChange={(e) => data.times = Number(e.target.value)} />
          <span> times</span>
        </div>
      <div className="for-btn-container">
        <button onClick={() => ctx.addNode('move', id, data.level)}>+ Move</button>
        <button onClick={() => ctx.addNode('turn', id, data.level)}>+ Turn</button>
        <button onClick={() => ctx.addNode('for', id, data.level)}>+ For</button>
      </div>


      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ForNode