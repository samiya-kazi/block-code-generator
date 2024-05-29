import { Handle, Position } from 'reactflow'

function StartNode() {
  return (
    <div className="base-node">
    <div style={{ padding: '5px 20px', height: '3rem' }}>
      <div className="node-title">Start</div>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
  )
}

export default StartNode