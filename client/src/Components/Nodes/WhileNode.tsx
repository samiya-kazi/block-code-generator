import React, { useContext } from "react";
import FlowContext from "../../Context/FlowContext";
import whileSVG from "../../assets/while.svg";
import close from "../../assets/close.svg";

function WhileNode({
  id,
  data,
  selected,
}: {
  id: string;
  data: {
    label: string;
    level: number;
    condition?: string;
  };
  selected: boolean;
}) {
  const ctx = useContext(FlowContext);

  const numOfChild = ctx.nodes.reduce(
    (count, node) => (node.parentId == id ? count + 1 : count),
    0
  );

  return (
    <div
      className={"base-node while-node" + (selected ? " selected-node" : "")}
      style={{
        height: `${numOfChild * 6 + 6}rem`,
        width: 350 - 20 * data.level,
      }}
    >
      <div className="flex">
        <div className='node-icon flex-center'><img src={whileSVG} /></div>
        <div className="flex-grow">
          <div className="node-info">
            <span>While </span>
            <select className='select-input' onChange={(e) => data.condition = e.target.value}>
              <option value="front-clear">Front is clear</option>
              <option value="right-clear">Right is clear</option>
              <option value="left-clear">Left is clear</option>
              <option value="not-target">Not at target</option>
            </select>
          </div>
          {data.level < 3 && (
            <div className="for-btn-container">
              <button onClick={() => ctx.addNode("move", id, data.level)}>
                + Move
              </button>
              <button onClick={() => ctx.addNode("turn", id, data.level)}>
                + Turn
              </button>
              {data.level < 2 && (
                <button onClick={() => ctx.addNode("for", id, data.level)}>
                  + For
                </button>
              )}
            </div>
          )}
        </div>

        <div className="close-btn-container">
          <img
            className="close-btn"
            src={close}
            onClick={() => ctx.removeNode(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default WhileNode;
