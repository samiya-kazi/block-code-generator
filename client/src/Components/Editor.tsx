import { useContext, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';
import FlowContext from '../Context/FlowContext';
import StartNode from './StartNode';
import { convertFlowToArray } from '../utils/convert';


function Editor() {

  const { nodes, edges, onConnect, onEdgesChange, onNodesChange, addNode } = useContext(FlowContext);

  const nodeTypes = useMemo(() => ({
    start: StartNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode
  }), []);

  function convert() {
    const res = convertFlowToArray(nodes, edges);
    console.log(res);
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