import { Edge, Node } from "reactflow";

// export const convertFlowToFunction = (nodes: Node[], edges: Edge[]) => {
//   if (!nodes.length || !edges.length) return '';

//   let copiedNodes = JSON.parse(JSON.stringify(nodes)) as Node[];
//   const copiedEdges = JSON.parse(JSON.stringify(edges)) as Edge[];

//   let res = '';
//   let prevIndent = 0;
//   let nodeStack: Node[] = [];

//   const index = copiedNodes.findIndex(node => node.type === 'start');
//   nodeStack.push(copiedNodes[index]);

//   while (nodeStack.length) {
//     const currentNode = nodeStack.pop()!;
//     let indent = nodeStack.length;

//     if (indent < prevIndent) {
//       for (let index = 0; index < indent; index++) {
//         res += ' '
//       }

//       res += '}\n'
//     }

//     for (let index = 0; index < indent; index++) {
//       res += ' '
//     }

//     if (currentNode.type === 'move') {
//       res += `move(${currentNode.data.steps})\n`
//     } else if (currentNode.type === 'turn') {
//       res += `turn(${currentNode.data.direction})\n`
//     } else if (currentNode.type === 'for') {
//       res += `for(let i = 0; i < ${currentNode.data.times}; i++) {\n`
//     } else res += ``


//     const edgeIndex = copiedEdges.findIndex(edge => edge.source === currentNode.id);
//     if (edgeIndex === -1) {
//       res += '}';
//       return res;
//     }

//     const edge = copiedEdges[edgeIndex];
//     const nextNodeIndex = copiedNodes.findIndex(node => node.id === edge.target);
//     if (nextNodeIndex === -1) {
//       res += '}';
//       return res
//     };
//     nodeStack.push(copiedNodes[nextNodeIndex]);
//     prevIndent = indent;
//   }

//   res += '}';

//   return res;
// }

export const convertFlowToFunction = (nodes: Node[], edges: Edge[]) => {
  const arr = generateCodeArray(nodes, edges);
  return arr.join('\n')
}

export const generateCodeArray = (nodes: Node[], edges: Edge[], parentId?: string) => {
  if (!nodes.length || !edges.length) return [];

  let copiedNodes = JSON.parse(JSON.stringify(nodes)) as Node[];
  const copiedEdges = JSON.parse(JSON.stringify(edges)) as Edge[];

  let nodeArray: Node[] = [];
  let codeArray: string[] = [];

  if (!parentId) {
    const index = copiedNodes.findIndex(node => node.type === 'start');
    nodeArray.push(copiedNodes[index]);
  } else {
    let startNode = copiedNodes.find(node => {
      if (node.parentId !== parentId) return false;

      const connectedEdges = copiedEdges.filter(ed => ed.target === node.id || ed.source === node.id);
      if (connectedEdges.length === 1 && connectedEdges[0].source === node.id) return true;
      return false;
    });

    if (!startNode) {
      const childNodes = copiedNodes.filter(node => node.parentId === parentId);
      if (!childNodes.length) return [];
      startNode = childNodes[0];
    }

    nodeArray.push(startNode);
  }

  let flag = true;

  while (flag) {
    const lastStep = nodeArray[nodeArray.length - 1];

    if (lastStep.type === "move") {
      codeArray.push([...Array(lastStep.data.level - 1).fill('  '), `move(${lastStep.data.steps})`].join(''));
    } else if (lastStep.type === "turn") {
      codeArray.push([...Array(lastStep.data.level - 1).fill('  '), `turn('${lastStep.data.direction}')`].join(''));
    }
    if (lastStep.type === "for") {
      codeArray.push([...Array(lastStep.data.level - 1).fill('  '), `for (let i = 0; i < ${lastStep.data.times}; i++) {`].join(''));
      const subNodes = generateCodeArray(copiedNodes, copiedEdges, lastStep.id);
      codeArray.push(...subNodes);
      codeArray.push([...Array(lastStep.data.level - 1).fill('  '), `}`].join(''));
    }

    const edgeIndex = copiedEdges.findIndex(edge => edge.source === lastStep.id);
    if (edgeIndex === -1) {
      flag = false;
      break;
    }

    const edge = copiedEdges[edgeIndex];
    const nextNodeIndex = copiedNodes.findIndex(node => node.id === edge.target);
    const nextNode = copiedNodes[nextNodeIndex];
    nodeArray.push(nextNode);
  }

  return codeArray;
}


export const convertFlowToArray = (nodes: Node[], edges: Edge[]) => {
  const nodeArray = generateNodeArray(nodes, edges);
  return convertNodeArrToSingleSteps(nodeArray);
}

function generateNodeArray(nodes: Node[], edges: Edge[], parentId?: string) {
  if (!nodes.length || !edges.length) return [];

  let copiedNodes = JSON.parse(JSON.stringify(nodes)) as Node[];
  const copiedEdges = JSON.parse(JSON.stringify(edges)) as Edge[];

  let nodeArray: Node[] = [];

  if (!parentId) {
    const index = copiedNodes.findIndex(node => node.type === 'start');
    nodeArray.push(copiedNodes[index]);
  } else {
    let startNode = copiedNodes.find(node => {
      if (node.parentId !== parentId) return false;

      const connectedEdges = copiedEdges.filter(ed => ed.target === node.id || ed.source === node.id);
      if (connectedEdges.length === 1 && connectedEdges[0].source === node.id) return true;
      return false;
    });

    if (!startNode) {
      const childNodes = copiedNodes.filter(node => node.parentId === parentId);
      if (!childNodes.length) return [];
      startNode = childNodes[0];
    }

    nodeArray.push(startNode);
  }

  let flag = true;

  while (flag) {
    const lastStep = nodeArray[nodeArray.length - 1];

    if (lastStep.type === "for") {
      nodeArray.pop();
      const subNodes = generateNodeArray(copiedNodes, copiedEdges, lastStep.id);
      for (let i = 0; i < lastStep.data.times; i++) {
        nodeArray.push(...subNodes);
      }
    }

    const edgeIndex = copiedEdges.findIndex(edge => edge.source === lastStep.id);
    if (edgeIndex === -1) {
      flag = false;
      break;
    }

    const edge = copiedEdges[edgeIndex];
    const nextNodeIndex = copiedNodes.findIndex(node => node.id === edge.target);
    const nextNode = copiedNodes[nextNodeIndex];
    nodeArray.push(nextNode);
  }

  return nodeArray;
}

export function convertNodeArrToSingleSteps(nodes: Node[]) {
  const res: string[] = [];

  for (const node of nodes) {
    if (node.type === 'move') {
      for (let i = 0; i < node.data.steps; i++) {
        res.push('move');
      }
    } else res.push(node.data.direction)
  }

  return res;
}