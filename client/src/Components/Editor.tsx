import { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant, Connection, Edge, EdgeChange, MarkerType, NodeChange, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import ForNode from './ForNode';
import MoveNode from './MoveNode';
import TurnNode from './TurnNode';
import FlowContext from '../Context/FlowContext';
import StartNode from './StartNode';
import { convertFlowToFunction } from '../utils/convert';

const parent: "parent" = "parent";

function Editor() {
  const nodeTypes = useMemo(() => ({ 
    start: StartNode,
    move: MoveNode,
    turn: TurnNode,
    for: ForNode 
  }), []);

  const [nodes, setNodes] = useNodesState<{
    label?: string,
    steps?: number,
    direction?: string,
    times?: number,
    parentId?: string
  }>([{ id: 'start-node', type: 'start', position: { x: 100, y: 100}, data: { label: 'Start' }}]);
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

  function addNode(type: string, parentId?: string) {

    if (parentId) {
      const parentIndex = nodes.findIndex(node => node.id === parentId);
      if (parentIndex === -1) return;
    }

    let data;
    if (type === 'move') data = { steps: 0, parentId };
    else if (type === 'turn') data = { direction: 'left', parentId }
    else if (type === 'for') data = { times: 0, parentId };
    else data = { label: 'New node', parentId };

    const newNode = {
      id: Date.now().toString(),
      position: parentId ? { x: 0, y: 0 } : { x: 200, y: 200 },
      data,
      type,
      parentId,
      ...(parentId ? { extent: parent } : {})
    };

    setNodes([...nodes, newNode]);
  }

  useEffect(() => {
    const newNodes = nodes.map(node => node.data.parentId ? {...node, parentId: node.data.parentId } : node);
    setNodes(newNodes);
  }, [setNodes]);

  function convert () {
    const res = convertFlowToFunction(nodes, edges);
    console.log(res);
  }

  return (
    <FlowContext.Provider value={{ nodes: nodes, edges: edges, onConnect, onEdgesChange, onNodesChange, addNode }}>
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