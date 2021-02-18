import { GridDetails, StartNode, EndNode } from "./GridDetails";
import AnalyzeNode from "../algorithms/AnalyzeNode";

function BuildCell(row, col) {
  const moveX = col * GridDetails.cellSize + GridDetails.gridMargin;
  const moveY = row * GridDetails.cellSize + GridDetails.gridMargin;
  let additionalClass = "";

  if (row === StartNode.xPos && col === StartNode.yPos) {
    additionalClass = " startNode";
  } else if (row === EndNode.xPos && col === EndNode.yPos) {
    additionalClass = " endNode";
  }

  function handleClick(e) {
    // AnalyzeNode([row, col]);
    // if (analyzedNode === "start") {
    //   // is start node
    // } else if (analyzedNode === "end") {
    //   // is end node
    // } else if (analyzedNode === "visited") {
    //   // ;turn to visited node
    //   additionalClass = " visitedNode";
    //   e.target.className = `grid${additionalClass}`;
    // } else {
    //   // do nothing 
    // }
  }

  return (
    <div
      onClick={(e) => handleClick(e)}
      key={`${row}, ${col}`}
      id={`${row}, ${col}`}
      className={`grid${additionalClass}`}
      style={{
        top: `${moveX}px`,
        left: `${moveY}px`,
        height: GridDetails.cellSize,
        width: GridDetails.cellSize,
        border: "1px solid black",
      }}
    >
      {/* {row}, {col} */}
    </div>
  );
}

export default BuildCell;
