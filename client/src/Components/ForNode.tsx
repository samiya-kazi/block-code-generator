import React, { useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow'
import FlowContext from '../Context/FlowContext';

function ForNode({ id, data }: { 
  id: string, 
  data: { 
    label: string, 
    times?: number
  } 
}) {

  const context = useContext(FlowContext);

  const numOfChild = context.nodes.reduce((count, node) => node.parentId == id ? count + 1 : count, 0);

  return (
    <div className="base-node">
      <div style={{ padding: '10px 20px', height: `${(numOfChild * 3) + 3}rem` }}>
        <div>
          <button onClick={() =>  context.addNode('move', id)}>+ Move</button>
          <button onClick={() =>  context.addNode('turn', id)}>+ Turn</button>
          <button onClick={() =>  context.addNode('for', id)}>+ For</button>
        </div>
        <span>For </span>
        <input type="number" onChange={(e) => data.times = Number(e.target.value)} />
        <span> times</span>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ForNode