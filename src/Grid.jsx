import React from "react";

import { GridDetails, CellDetails, StartNode } from "./GridDetails";

import "./Grid.css";

const searchArray = [];

export default function Cell() {
  const [getGrid, setGrid] = React.useState(() => InitializeGrid());

  function TestFunction() {
    setGrid([...getGrid, getGrid[0][0] = BuildCell(0, 0, "visitedNode")])
  }

  return (
    <>
      {getGrid}
      <button onClick={() => TestFunction()}>Click</button>
    </>
  );
}

function BuildCell(i, j, className, delay) {
  let tempClass = className;

  const HandleClick = (e) => {
    console.log(e.target)
    let temp = e.target
    // e.target.style.animation-delay: 9s
    temp.className = temp.className + " visitedNode";
  };

  const gridDetails = GridDetails;
  let cellDetails;

  if (i === StartNode.xLoc && j === StartNode.yLoc) {
    cellDetails = { ...StartNode };
    tempClass = cellDetails.className;
    console.log(cellDetails);
  } else {
    cellDetails = { ...CellDetails };
    cellDetails.xLoc = i;
    cellDetails.yLoc = j;
  }

  cellDetails.moveX = i * GridDetails.cellSize + GridDetails.margin;
  cellDetails.moveY = j * GridDetails.cellSize + GridDetails.margin;

  return (
    <div
      onClick={(e) => HandleClick(e)}
      className={`gridCell ${tempClass}`}
      style={{
        left: `${cellDetails.moveX}px`,
        top: `${cellDetails.moveY}px`,
        width: gridDetails.cellSize,
        height: gridDetails.cellSize,
      }}
    >{`${cellDetails.xLoc}, ${cellDetails.yLoc}`}</div>
  );
}

function InitializeGrid() {
  const gridArray = [];
  for (let i = 0; i < GridDetails.numRows; i++) {
    gridArray.push([]);
    for (let j = 0; j < GridDetails.numCols; j++) {
      gridArray[i].push(BuildCell(i, j, "unvisitedNode"));
    }
  }
  console.log("gridArray = ")
  console.log(gridArray)
  return gridArray;
}
