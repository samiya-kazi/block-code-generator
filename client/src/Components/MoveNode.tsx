import { Handle, Position } from 'reactflow'

function MoveNode({ data }: { id: string, data: { label: string, steps?: number }}) {
  return (
    <div className="base-node">
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