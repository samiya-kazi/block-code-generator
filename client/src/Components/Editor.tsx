import { useContext, useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';
import FlowContext from '../Context/FlowContext';
import StartNode from './StartNode';
import { convertFlowToArray } from '../utils/convert';

const movement = {
  up: { x: -1, y: 0 },
  down: { x: 1, y: 0 },
  left: { x: 0, y: -1 },
  right: { x: 0, y: 1 },
};

const turnRight = {
  up: 'right',
  down: 'left',
  left: 'up',
  right: 'down',
};

const turnLeft = {
  up: 'left',
  down: 'right',
  left: 'down',
  right: 'up',
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
        console.log(nextStep)
        if (nextStep === 'move') {
          console.log('Prev pos', ctx.currentPos)
          const displacement = movement[ctx.direction];
          const x = ctx.currentPos.x + displacement.x < 5 && ctx.currentPos.x + displacement.x >= 0 ? ctx.currentPos.x + displacement.x : ctx.currentPos.x;
          const y = ctx.currentPos.y + displacement.y < 5 && ctx.currentPos.y + displacement.y >= 0 ? ctx.currentPos.y + displacement.y : ctx.currentPos.y;
          ctx.setCurrentPos({ x, y });
        } else if (nextStep === 'right') {
          ctx.setDirection(turnRight[ctx.direction] as 'up' | 'down' | 'left' | 'right');
        } else {
          ctx.setDirection(turnLeft[ctx.direction] as 'up' | 'down' | 'left' | 'right');
        }
      }
    }, 500);

  }, [ctx.direction, ctx.currentPos, run])

  function convert() {
    const res = convertFlowToArray(nodes, edges);
    setSteps(res.slice(1));
    setRun(true);
    console.log(res);
  }

  function start(steps: string[]) {
    if (!steps.length) return;
    const copy = [...steps].slice(1);

    console.log(copy)



    takeStep(copy);
  }

  function takeStep(copy: string[]) {
    const nextStep = copy.shift();
    console.log(nextStep)
    if (nextStep === 'move') {
      console.log('Prev pos', ctx.currentPos)
      const displacement = movement[ctx.direction];
      const x = ctx.currentPos.x + displacement.x < 5 && ctx.currentPos.x + displacement.x >= 0 ? ctx.currentPos.x + displacement.x : ctx.currentPos.x;
      const y = ctx.currentPos.y + displacement.y < 5 && ctx.currentPos.y + displacement.y >= 0 ? ctx.currentPos.y + displacement.y : ctx.currentPos.y;
      ctx.setCurrentPos({ x, y });
    } else if (nextStep === 'right') {
      ctx.setDirection(turnRight[ctx.direction] as 'up' | 'down' | 'left' | 'right');
    } else {
      ctx.setDirection(turnLeft[ctx.direction] as 'up' | 'down' | 'left' | 'right');
    }

    if (copy.length) {
      setTimeout(() => { takeStep(copy) }, 3000);
    }
  }

  return (
    <div className='editor-container'>
      <button onClick={() => { addNode("move") }}>+ Move</button>
      <button onClick={() => { addNode("turn") }}>+ Turn</button>
      <button onClick={() => { addNode("for") }}>+ For</button>
      <button onClick={() => { convert() }}>Convert</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background color="##324ca8" variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  )
}

export default Editor