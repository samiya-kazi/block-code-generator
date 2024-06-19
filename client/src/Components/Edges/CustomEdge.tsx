import {
  BaseEdge,
  EdgeLabelRenderer,
  MarkerType,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import close from "../../assets/close.svg";
import { CSSProperties } from "react";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  markerEnd,
  style,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  selected?: boolean;
  markerEnd?: string | MarkerType;
  style?: CSSProperties;
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {selected && (
        <EdgeLabelRenderer>
          <button
            className="edge-close-btn"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              zIndex: 20,
              pointerEvents: 'all'
            }}
            onClick={() => setEdges(prev => prev.filter(edge => edge.id !== id))}
          >
            <img src={close} />
          </button>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default CustomEdge;
