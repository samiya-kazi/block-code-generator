import { Sprite } from '@pixi/react-animated'
import rocket from '../assets/rocket.svg';

function Target(props: { x: number, y: number, angle: number }) {
  return (
    <Sprite
          image={rocket}
          anchor={0.5}
          {...props}
        />
  )
}

export default Target