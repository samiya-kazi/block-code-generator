import React from 'react'
import { Handle, Position } from 'reactflow'

function TurnNode({ id, data }: { id: string, data: { label: string, steps?: number } }) {
  return (
    <div className="base-node">
      <div style={{ padding: '10px 20px' }}>
        <span>Turn </span>
        <select>
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
        </select>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default TurnNode