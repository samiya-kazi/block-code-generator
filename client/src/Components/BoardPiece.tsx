import { Spring } from 'react-spring'
import { Sprite } from '@pixi/react-animated';
import robot from '../assets/robot.svg';

function BoardPiece(props: { x: number, y: number, angle: number }) {
  return (
    <Spring to={props} config={{ mass: 10, tension: 1000, friction: 100 }}>
      {(props) => (
        <Sprite
          image={robot}
          anchor={0.5}
          {...props}
        />
      )}
    </Spring>
  )
}

export default BoardPiece