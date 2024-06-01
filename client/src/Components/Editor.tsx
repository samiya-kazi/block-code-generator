import { useCallback, useContext, useEffect, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Connection, Edge, EdgeChange, MarkerType, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';
import FlowContext from '../Context/FlowContext';
import StartNode from './StartNode';
import { convertFlowToArray, convertFlowToFunction } from '../utils/convert';

const parent: "parent" = "parent";

function Editor() {

  const { nodes, edges, onConnect, onEdgesChange, onNodesChange, addNode } = useContext(FlowContext);

  const nodeTypes = useMemo(() => ({ 
    start: StartNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode 
  }), []);

  function convert () {
    const res = convertFlowToArray(nodes, edges);
    console.log(res);
  }

  return (
    <FlowContext.Provider value={{ nodes: nodes, edges: edges, onConnect, onEdgesChange, onNodesChange, addNode, currentPos: { x: 0, y: 0 } }}>
      <div className='editor-container'>
        <button onClick={() => {addNode("move")}}>+ Move</button>
        <button onClick={() => {addNode("turn")}}>+ Turn</button>
        <button onClick={() => {addNode("for")}}>+ For</button>
        <button onClick={() => {convert()}}>Convert</button>
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
    </FlowContext.Provider>
  )
}

export default Editor