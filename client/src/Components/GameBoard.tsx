import { Stage } from '@pixi/react'
import BoardPiece from './BoardPiece';
import { useContext } from 'react';
import FlowContext from '../Context/FlowContext';
import Target from './Target';
import Enemy from './Enemy';

const stageWidth = 400;
const stageHeight = 400;

function GameBoard() {

  const ctx = useContext(FlowContext);

  return (
    <div>
      <div className='board-container'>
        <Stage
          width={stageWidth}
          height={stageHeight}
          options={{ backgroundAlpha: 0 }}>
          <BoardPiece {...ctx.currentPos} angle={ctx.angle} />
          { ctx.danger.map(danger => <Enemy x={danger.x} y={danger.y} angle={0} />) }
          <Target x={ctx.target.x} y={ctx.target.y} angle={0} />
        </Stage>
      </div>
      <div className="code-container">
        <pre>{ctx.code}</pre>
      </div>
    </div>
  )
}

export default GameBoard