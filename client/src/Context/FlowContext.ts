import { createContext } from "react";
import { Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

const onConnect = (_params: Edge | Connection) => { return };

const onNodesChange = (_changes: NodeChange[]) => { return };

const onEdgesChange = (_changes: EdgeChange[]) => { return };

const addNode = (_type: string, _parentId?: string) => { 
  console.log('I am the context function');
  return;
 };

const FlowContext = createContext<{ 
  nodes: Node<{
    label?: string,
    steps?: number,
    direction?: string,
    times?: number,
    parentId?: string
  }>[],
  edges: Edge[],
  onConnect: (params: Edge | Connection) => void,
  onNodesChange: (changes: NodeChange[]) => void,
  onEdgesChange: (changes: EdgeChange[]) => void,
  addNode: (type: string, parentId?: string) => void
}>({ 
  nodes: [], 
  edges: [], 
  onConnect, 
  onNodesChange, 
  onEdgesChange, 
  addNode 
})

export default FlowContext;