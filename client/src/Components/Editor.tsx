import { useContext, useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, ControlButton, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';
import FlowContext from '../Context/FlowContext';
import StartNode from './StartNode';
import { convertFlowToArray, convertFlowToFunction } from '../utils/convert';

const movement = {
  0: { x: 80, y: 0 },
  90: { x: 0, y: 80 },
  180: { x: -80, y: 0 },
  270: { x: 0, y: -80 },
};

function Editor() {

  const { nodes, edges, onConnect, onEdgesChange, onNodesChange, addNode } = useContext(FlowContext);
  const ctx = useContext(FlowContext);
  const [steps, setSteps] = useState<string[]>([]);
  const [run, setRun] = useState(false);

  const nodeTypes = useMemo(() => ({
    start: StartNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode
  }), []);

  useEffect(() => {
    const copy = [...steps]
    setTimeout(() => {
      if (run && copy.length) {
        const nextStep = copy.shift();
        setSteps(copy);
        if (nextStep === 'move') {
          const displacement = movement[ctx.angle];
          const x = ctx.currentPos.x + displacement.x < 400 && ctx.currentPos.x + displacement.x >= 40 ? ctx.currentPos.x + displacement.x : ctx.currentPos.x;
          const y = ctx.currentPos.y + displacement.y < 400 && ctx.currentPos.y + displacement.y >= 40 ? ctx.currentPos.y + displacement.y : ctx.currentPos.y;
          ctx.setCurrentPos({ x, y });
        } else if (nextStep === 'right') {
          ctx.setAngle(((ctx.angle + 90) % 360) as 0 | 90 | 180 | 270);
        } else {
          ctx.setAngle(((ctx.angle - 90) % 60) as 0 | 90 | 180 | 270);
        }
      }
    }, 500);

  }, [ctx.angle, ctx.currentPos, run])

  function convert() {
    const res = convertFlowToArray(nodes, edges);
    setSteps(res.slice(1));
    setRun(true);

    const res1 = convertFlowToFunction(nodes, edges);
    ctx.setCode(res1);
  }

  return (
    <div className='editor-container'>
      <div className='toolbar'>
        <button className='toolbar-btn' onClick={() => { addNode("move") }}>+ Move</button>
        <button className='toolbar-btn' onClick={() => { addNode("turn") }}>+ Turn</button>
        <button className='toolbar-btn' onClick={() => { addNode("for") }}>+ For</button>
        <button className='toolbar-btn' onClick={() => { convert() }}>Convert</button>
      </div>

      <div className='flow-container'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Background color="##324ca8" variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default Editor