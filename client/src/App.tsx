import Editor from './Components/Editor';
import './App.css';
import GameBoard from './Components/GameBoard';
import { useCallback, useEffect } from 'react';
import { useNodesState, useEdgesState, Edge, Connection, MarkerType, addEdge, NodeChange, applyNodeChanges, EdgeChange, applyEdgeChanges } from 'reactflow';
import FlowContext from './Context/FlowContext';
// import BoardContext from './Context/BoardContext';

const parent: "parent" = "parent";

function App() {
  
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



  return (
    <FlowContext.Provider
      value={{
        currentPos: { x: 0, y: 0 },
        nodes,
        edges,
        onConnect,
        onNodesChange,
        onEdgesChange,
        addNode
      }}
    >
      <div className="page-container">
        <Editor />
        <GameBoard />
      </div>
    </FlowContext.Provider>
  );
}

export default App;
