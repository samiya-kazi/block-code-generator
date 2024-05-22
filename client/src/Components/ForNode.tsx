import React from 'react';
import { Handle, Position } from 'reactflow'

function ForNode({ id, data }: { id: string, data: { label: string, steps?: number } }) {
  return (
    <div className="base-node">
      <div style={{ padding: '10px 20px' }}>
        <span>For </span>
        <input type="number" onChange={(e) => data.steps = Number(e.target.value)} />
        <span> times</span>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ForNode