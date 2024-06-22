import { Edge, Node } from "reactflow";
import { IStep } from "../interfaces/Step.interface";

export const convertFlowToFunction = (nodes: Node[], edges: Edge[]) => {
  const steps = generateNodeArray(nodes, edges);
  const arr = generateCodeArray(steps);
  return arr.join('\n');
}

function generateCodeArray(steps: IStep[]) {

  const codeArray: string[] = [];

  for (const step of steps) {
    if (step.type === "move") {
      codeArray.push([...Array(step.node.data.level - 1).fill('  '), `move(${step.node.data.steps})`].join(''));
    } else if (step.type === "turn") {
      codeArray.push([...Array(step.node.data.level - 1).fill('  '), `turn('${step.node.data.direction}')`].join(''));
    }
    if (step.type === "for" || step.type === "while") {
      if (step.type === "for")
        codeArray.push([...Array(step.node.data.level - 1).fill('  '), `for (let i = 0; i < ${step.node.data.times}; i++) {`].join(''));
      else 
      codeArray.push([...Array(step.node.data.level - 1).fill('  '), `while (${step.node.data.condition}) {`].join(''));
      if (step.children) {
        const subNodes = generateCodeArray(step.children);
        codeArray.push(...subNodes);
      }
      codeArray.push([...Array(step.node.data.level - 1).fill('  '), `}`].join(''));
    }
  }

  return codeArray;

}


export function generateNodeArray(nodes: Node[], edges: Edge[], parentId?: string) {
  if (!nodes.length || !edges.length) return [];

  let copiedNodes = JSON.parse(JSON.stringify(nodes)) as Node[];
  const copiedEdges = JSON.parse(JSON.stringify(edges)) as Edge[];

  let nodeArray: IStep[] = [];

  const startNode = getStartNode(copiedNodes, copiedEdges, parentId);
  if (!startNode) return nodeArray;
  nodeArray.push({ id: startNode.id, type: startNode.type ?? 'start', node: startNode });

  let flag = true;

  while (flag) {
    const lastStep = nodeArray[nodeArray.length - 1];

    if (lastStep.type === "for" || lastStep.type === "while") {
      const subNodes = generateNodeArray(copiedNodes, copiedEdges, lastStep.id);
      lastStep.children = subNodes;
    }

    const edgeIndex = copiedEdges.findIndex(edge => edge.source === lastStep.id);
    if (edgeIndex === -1) {
      flag = false;
      break;
    }

    const edge = copiedEdges[edgeIndex];
    const nextNodeIndex = copiedNodes.findIndex(node => node.id === edge.target);
    const nextNode = copiedNodes[nextNodeIndex];
    nodeArray.push({ id: nextNode.id, type: nextNode.type ?? '', node: nextNode });
  }

  return nodeArray;
}


function getStartNode(nodes: Node[], edges: Edge[], parentId?: string) {
  if (!parentId) {
    const index = nodes.findIndex(node => node.type === 'start');
    return nodes[index];
  } else {
    let startNode = nodes.find(node => {
      if (node.parentId !== parentId) return false;

      const connectedEdges = edges.filter(ed => ed.target === node.id || ed.source === node.id);
      if (connectedEdges.length === 1 && connectedEdges[0].source === node.id) return true;
      return false;
    });

    if (!startNode) {
      const childNodes = nodes.filter(node => node.parentId === parentId);
      if (!childNodes.length) return undefined;
      startNode = childNodes[0];
    }

    return startNode;
  }
}