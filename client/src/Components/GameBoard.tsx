import { Stage } from '@pixi/react'
import BoardPiece from './BoardPiece';
import { useContext } from 'react';
import FlowContext from '../Context/FlowContext';

const stageWidth = 400;
const stageHeight = 400;

function GameBoard() {

  const ctx = useContext(FlowContext);

  return (
    <div>
      <Stage
        width={stageWidth}
        height={stageHeight}
        options={{ backgroundAlpha: 0 }}>
        <BoardPiece {...ctx.currentPos} angle={ctx.angle} />
      </Stage>
    </div>
  )
}

export default GameBoard