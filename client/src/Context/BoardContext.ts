import { createContext } from "react";
import { Edge, Node } from "reactflow";

const BoardContext = createContext<{
  currentPos: {
    x: number,
    y: number
  },
  nodes: Node<{
    label?: string,
    steps?: number,
    direction?: string,
    times?: number,
    parentId?: string
  }>[],
  edges: Edge[],
}>({
  currentPos: {
    x: 0,
    y: 0
  },
  nodes: [],
  edges: []
});

export default BoardContext;