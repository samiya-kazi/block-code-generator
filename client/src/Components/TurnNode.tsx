import { Handle, Position } from 'reactflow'

function TurnNode({ data }: { id: string, data: { label: string, direction?: string } }) {
  return (
    <div className="base-node">
      <div style={{ padding: '10px 20px' }}>
        <span>Turn </span>
        <select onChange={(e) => data.direction = e.target.value}>
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