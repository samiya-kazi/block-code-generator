import { useContext } from 'react';
import { Handle, Position } from 'reactflow'
import FlowContext from '../Context/FlowContext';
import close from '../assets/close.svg';
import loop from '../assets/loop.svg';

function ForNode({ id, data, selected }: {
  id: string,
  data: {
    label: string,
    level: number,
    times?: number
  },
  selected: boolean
}) {

  const ctx = useContext(FlowContext);

  const numOfChild = ctx.nodes.reduce((count, node) => node.parentId == id ? count + 1 : count, 0);

  return (
    <div className={"base-node for-node" + (selected ? " selected-node" : "")} style={{ height: `${(numOfChild * 6) + 6}rem`, width: (350 - (20 * data.level)) }}>
      <div className='flex'>
        <div className='node-icon flex-center'><img src={loop} /></div>
        <div className='flex-grow'>
          <div className='node-info'>
            <span>For </span>
            <input type="number" className='num-input' onChange={(e) => data.times = Number(e.target.value)} />
            <span> times</span>
          </div>
          { data.level < 3 && 
            <div className="for-btn-container">
              <button onClick={() => ctx.addNode('move', id, data.level)}>+ Move</button>
              <button onClick={() => ctx.addNode('turn', id, data.level)}>+ Turn</button>
              { data.level < 2 &&
                <button onClick={() => ctx.addNode('for', id, data.level)}>+ For</button>
              }
            </div>
          }
        </div>

        <div className="close-btn-container"><img className="close-btn" src={close}  onClick={() => ctx.removeNode(id)} /></div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ForNode