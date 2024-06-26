import React, { createContext } from "react";
import { Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

const onConnect = (_params: Edge | Connection) => { return };

const onNodesChange = (_changes: NodeChange[]) => { return };

const onEdgesChange = (_changes: EdgeChange[]) => { return };

const addNode = (_type: string, _parentId?: string) => {};

const removeNode = (_id: string) => { return };

const setCurrentPos = () => {};

const setAngle = () => {};

const setCode = () => {};

const removeEdge = (_id: string) => {};

const FlowContext = createContext<{
  nodes: Node<{
    label?: string,
    steps?: number,
    direction?: string,
    condition?: string,
    times?: number,
    parentId?: string
  }>[],
  edges: Edge[],
  onConnect: (params: Edge | Connection) => void,
  onNodesChange: (changes: NodeChange[]) => void,
  onEdgesChange: (changes: EdgeChange[]) => void,
  addNode: (type: string, parentId?: string, parentLevel?: number) => void,
  removeNode: (id: string) => void,
  currentPos: {
    x: number,
    y: number
  },
  setCurrentPos: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
  angle: 0 | 90 | 180 | 270,
  setAngle: React.Dispatch<React.SetStateAction<0 | 90 | 180 | 270>>,
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>,
  removeEdge: (id: string) => void,
  danger: { x: number, y: number }[],
  target: { x: number, y: number }
}>({
  nodes: [],
  edges: [],
  onConnect,
  onNodesChange,
  onEdgesChange,
  addNode,
  removeNode,
  currentPos: {
    x: 40,
    y: 40
  },
  setCurrentPos,
  angle: 0,
  setAngle,
  code: "",
  setCode,
  removeEdge,
  danger: [],
  target: { x: 360, y: 360 }
})

export default FlowContext;