import { Handle, Position } from 'reactflow'

function StartNode({ selected }: { selected: boolean }) {
  return (
    <div className={"base-node" + ( selected ? " selected-node" : "")}>
    <div style={{ padding: '5px 20px', height: '3rem' }}>
      <div className="node-title">Start</div>
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
  )
}

export default StartNode