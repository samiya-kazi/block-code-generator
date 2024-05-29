import { createContext } from "react";

const BoardContext = createContext<{
  currentPos: {
    x: number,
    y: number
  }
}>({
  currentPos: {
    x: 0,
    y: 0
  }
});

export default BoardContext;