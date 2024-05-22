import React, { useCallback, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Connection, Edge, EdgeChange, MarkerType, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';


function Editor() {
  const nodeTypes = useMemo(() => ({ 
    custom: CustomNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode 
  }), []);

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => {
      const newEdge = {
        ...params,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#324ca8',
        },
        style: {
          strokeWidth: 2,
          stroke: '#324ca8',
        }
      }
      const newEdges = addEdge(newEdge, eds);
      return newEdges
    }),
    [setEdges],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  function addNode(type: string) {
    const newNode = {
      id: Date.now().toString(),
      position: { x: 200, y: 200 },
      data: { label: 'New node' },
      type,
    };

    setNodes([...nodes, newNode]);
  }

  return (
    <div className='editor-container'>
      <button onClick={() => {addNode("move")}}>+ Move</button>
      <button onClick={() => {addNode("turn")}}>+ Turn</button>
      <button onClick={() => {addNode("for")}}>+ For</button>
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