import React from 'react'
import { Handle, Position } from 'reactflow'

function CustomNode({ id, data, type }: { id: string, data: { label: string, steps?: number }, type?: string }) {
  return (

    <div className="base-node">

      {type === 'move' &&
        <div style={{ padding: '10px 20px' }}>
          <span>Move </span>
          <input type="number" onChange={(e) => data.steps = Number(e.target.value)} />
          <span> steps</span>
        </div>
      }


      {type === "turn" &&
        <div style={{ padding: '10px 20px' }}>
          <span>Turn </span>
          <select>
            <option value={"left"}>Left</option>
            <option value={"right"}>Right</option>
          </select>
        </div>
      }

      {type === 'for-loop' &&
        <div style={{ padding: '10px 20px' }}>
          <span>For </span>
          <input type="number" onChange={(e) => data.steps = Number(e.target.value)} />
          <span> times</span>
        </div>
      }



      {/* <div style={{ padding: '10px 20px' }}>
        <input onChange={(e) => data.label = e.target.value ?? ''} />
      </div> */}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default CustomNode