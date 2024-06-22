import { useContext, useEffect, useMemo, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './Nodes/ForNode';
import MoveNode from './Nodes/MoveNode';
import TurnNode from './Nodes/TurnNode';
import FlowContext from '../Context/FlowContext';
import WhileNode from './Nodes/WhileNode';
import StartNode from './Nodes/StartNode';
import { generateNodeArray, convertFlowToFunction } from '../utils/convert';
import CustomEdge from './Edges/CustomEdge';
import { generateMoveset } from '../utils/moves';
import { IGamePosition } from '../interfaces/GamePosition.interface';


function Editor() {

  const { nodes, edges, onConnect, onEdgesChange, onNodesChange, addNode } = useContext(FlowContext);
  const ctx = useContext(FlowContext);
  const [steps, setSteps] = useState<IGamePosition[]>([]);
  const [run, setRun] = useState(false);

  const nodeTypes = useMemo(() => ({
    start: StartNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode,
    while: WhileNode
  }), []);

  const edgeTypes = useMemo(() => ({
    custom: CustomEdge
  }), []);

  useEffect(() => {
    const copy = [...steps]
    setTimeout(() => {
      if (run && copy.length) {
        const nextStep = copy.shift();
        setSteps(copy);
        ctx.setCurrentPos(nextStep?.position!);
        ctx.setAngle(nextStep?.angle! as 0 | 90 | 180 | 270)
      }
    }, 500);

  }, [ctx.angle, ctx.currentPos, run])

  function convert() {
    const res = generateNodeArray(nodes, edges);
    const moveset = generateMoveset(res, ctx.currentPos, ctx.angle, { max: { x: 400, y: 400 }, min: { x: 40, y:40 }});
    setSteps(moveset.moveset);
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
        <button className='toolbar-btn' onClick={() => { addNode("while") }}>+ While</button>
        <button className='toolbar-btn' onClick={() => { convert() }}>Convert</button>
      </div>

      <div className='flow-container'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
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