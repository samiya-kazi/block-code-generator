import { Edge, Node } from "reactflow";

export const convertFlowToFunction = (nodes: Node[], edges: Edge[]) => {
  if (!nodes.length || !edges.length) return '';

  let copiedNodes = JSON.parse(JSON.stringify(nodes)) as Node[];
  const copiedEdges = JSON.parse(JSON.stringify(edges)) as Edge[];

  let res = '';
  let prevIndent = 0;
  let nodeStack: Node[] = [];

  const index = copiedNodes.findIndex(node => node.type === 'start');
  nodeStack.push(copiedNodes[index]);

  while (nodeStack.length) {
    const currentNode = nodeStack.pop()!;
    let indent = nodeStack.length;

    if (indent < prevIndent) {
      for (let index = 0; index < indent; index++) {
        res += ' '
      }

      res += '}\n'
    }

    for (let index = 0; index < indent; index++) {
      res += ' '
    }

    if (currentNode.type === 'move') {
      res += `move(${currentNode.data.steps})\n`
    } else if (currentNode.type === 'turn') {
      res += `turn(${currentNode.data.direction})\n`
    } else if (currentNode.type === 'for') {
      res += `for(let i = 0; i < ${currentNode.data.times}; i++) {\n`
    } else res += ``


    const edgeIndex = copiedEdges.findIndex(edge => edge.source === currentNode.id);
    if (edgeIndex === -1) {
      res += '}';
      return res;
    }

    const edge = copiedEdges[edgeIndex];
    const nextNodeIndex = copiedNodes.findIndex(node => node.id === edge.target);
    if (nextNodeIndex === -1) {
      res += '}';
      return res
    };
    nodeStack.push(copiedNodes[nextNodeIndex]);
    prevIndent = indent;
  }

  res += '}';

  return res;
}