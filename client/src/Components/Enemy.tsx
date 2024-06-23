import { Sprite } from "@pixi/react-animated";
import danger from "../assets/danger.svg";

function Enemy(props: { x: number; y: number; angle: number }) {
  return <Sprite image={danger} anchor={0.5} {...props} />;
}

export default Enemy;
