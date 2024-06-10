import Editor from './Components/Editor';
import './App.css';
import GameBoard from './Components/GameBoard';
import { useCallback, useEffect, useState } from 'react';
import { useNodesState, useEdgesState, Edge, Connection, MarkerType, addEdge, NodeChange, applyNodeChanges, EdgeChange, applyEdgeChanges } from 'reactflow';
import FlowContext from './Context/FlowContext';

const parent: "parent" = "parent";

function App() {

  const [currentPos, setCurrentPos] = useState<{ x: number, y: number }>({ x: 40, y: 40 });
  const [angle, setAngle] = useState<0 | 90 | 180 | 270>(0);

  const [nodes, setNodes] = useNodesState<{
    label?: string,
    steps?: number,
    direction?: string,
    times?: number,
    parentId?: string,
    level: number
  }>([{ id: 'start-node', type: 'start', position: { x: 100, y: 100 }, data: { label: 'Start', level: 1 } }]);

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

  function addNode(type: string, parentId?: string, parentLevel?: number) {

    if (parentId) {
      const parentIndex = nodes.findIndex(node => node.id === parentId);
      if (parentIndex === -1) return;
    }

    const data = {
      parentId,
      level: parentLevel ? parentLevel + 1 : 1,
      steps: type === 'move' ? 0 : undefined,
      direction: type === 'turn' ? 'left' : undefined,
      times: type === 'for' ? 0 : undefined
    }

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


  function removeNode (id: string) {
    const nodesToRemove = getNodesToRemove(id);
    setNodes(prev => prev.filter(node => {
      if (node.id === id) return false;
      if (nodesToRemove.findIndex(n => n.id === node.id) !== -1) return false;
      return true;
    }));

    setEdges(prev => prev.filter(edge => {
      const targetIndex = nodesToRemove.findIndex(node => node.id === edge.target);
      const sourceIndex = nodesToRemove.findIndex(node => node.id === edge.source);
      return targetIndex === -1 && sourceIndex === -1;
    }));
  }

  function getNodesToRemove (id: string) {
    const nodeToRemove = nodes.filter(node => node.id === id);
    const childNodes = nodes.filter(node => node.parentId && node.parentId === id);
    if (!childNodes.length) return nodeToRemove;

    const allNodesToRemove = [...nodeToRemove];
    for (const node of childNodes) {
      allNodesToRemove.push(...getNodesToRemove(node.id));
    }
    return allNodesToRemove;
  }

  useEffect(() => {
    const newNodes = nodes.map(node => node.data.parentId ? { ...node, parentId: node.data.parentId } : node);
    setNodes(newNodes);
  }, [setNodes]);



  return (
    <FlowContext.Provider
      value={{
        currentPos,
        setCurrentPos,
        angle,
        setAngle,
        nodes,
        edges,
        onConnect,
        onNodesChange,
        onEdgesChange,
        addNode,
        removeNode
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