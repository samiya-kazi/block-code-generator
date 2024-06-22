import { IGamePosition } from "../interfaces/GamePosition.interface";
import { IStep } from "../interfaces/Step.interface";

const movement = {
  0: { x: 80, y: 0 },
  90: { x: 0, y: 80 },
  180: { x: -80, y: 0 },
  270: { x: 0, y: -80 },
};

export const generateMoveset = (
  steps: IStep[],
  startPosition: { x: number; y: number },
  startAngle: 0 | 90 | 180 | 270,
  boardLimit: { max: { x: number; y: number }; min: { x: number; y: number } }
) => {
  if (!steps.length)
    return { moveset: [], status: "complete" } as {
      moveset: IGamePosition[];
      status: string;
    };

  let currentPos = startPosition;
  let currentAngle = startAngle;

  const moveset: IGamePosition[] = [];

  for (const step of steps) {
    if (step.type === "move") {
      for (let i = 0; i < step.node.data.steps; i++) {
        const angle = (currentAngle >= 0 ? currentAngle % 360 : (Math.abs(currentAngle) + 180) % 360) as 0 | 90 | 180 | 270;
        const displacement = movement[angle];
        const x = currentPos.x + displacement.x;
        const y = currentPos.y + displacement.y;
        if (x > boardLimit.max.x || x < boardLimit.min.x || y > boardLimit.max.y || y < boardLimit.min.y)
          return { moveset, status: "fail" };
        currentPos = { x, y };
        moveset.push({ position: { x, y }, angle: currentAngle });
      }
    } else if (step.type === "turn") {
      if (step.node.data.direction === "right") currentAngle += 90; 
      else currentAngle -= 90;
      moveset.push({ position: { x: currentPos.x, y: currentPos.y }, angle: currentAngle });
    } else if (step.type === "for") {
      for (let i = 0; i < step.node.data.times; i++) {
        const moves = generateMoveset(step.children!, currentPos, currentAngle, boardLimit);
        moveset.push(...moves.moveset);
        currentPos = moves.moveset[moves.moveset.length - 1].position;
        currentAngle = moves.moveset[moves.moveset.length - 1].angle as 0 | 90 | 180 | 270;
        if (moves.status === "fail") return { moveset, status: "fail" }; 
      }
    }
  }

  return { moveset, status: 'complete' };
};
