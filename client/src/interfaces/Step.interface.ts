import { Node } from "reactflow";

export interface IStep {
  id: string,
  type: string, 
  children?: IStep[],
  node: Node
}