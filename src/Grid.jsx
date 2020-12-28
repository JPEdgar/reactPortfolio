import React, { useState } from "react";

import { GridDetails, CellDetails, StartNode } from "./GridDetails";

import "./Grid.css";

let tempVar = 0;

export default function Grid() {
  const [getGrid, setGrid] = useState(() => InitializeGrid());
  console.log(getGrid);

  function TestFunction() {
    let temp = getGrid[0].props.children;
     console.log(getGrid[1])

  }

  function PrintGrid() {
    console.log(getGrid);
    console.log(" - - - ");
  }
  return (
    <>
      {getGrid}
      <button onClick={() => TestFunction()}>Test</button>
      <button onClick={() => PrintGrid()}>Print Grid</button>
    </>
  );
}

function InitializeGrid() {
  const gridArray = [];
  for (let i = 0; i < GridDetails.numCols; i++) {
    for (let j = 0; j < GridDetails.numRows; j++) {
      gridArray.push(BuildCell(i, j, "unvisitedNode"));
      // console.log(gridArray)
    }
  }
  return gridArray;
}

function BuildCell(i, j, className) {
  let tempClass = className;

  const HandleClick = (e) => {
    console.log(cellDetails.id);
    console.log(e.target);
    let temp = e.target;
    temp.className = temp.className + " visitedNode";
  };

  const gridDetails = GridDetails;
  let cellDetails;

  if (i === StartNode.xLoc && j === StartNode.yLoc) {
    cellDetails = { ...StartNode };
    tempClass = cellDetails.className;
    // console.log(cellDetails);
  } else {
    cellDetails = { ...CellDetails };
    cellDetails.xLoc = i;
    cellDetails.yLoc = j;
  }

  cellDetails.moveX = i * GridDetails.cellSize + GridDetails.margin;
  cellDetails.moveY = j * GridDetails.cellSize + GridDetails.margin;

  return (
    <div
      key={`${i}, ${j}`}
      onClick={(e) => HandleClick(e)}
      className={`gridCell ${tempClass}`}
      style={{
        //   animation: `clickCell ${delay}s`, // this is the key to getting each individual cell to animate separately
        left: `${cellDetails.moveX}px`,
        top: `${cellDetails.moveY}px`,
        width: gridDetails.cellSize,
        height: gridDetails.cellSize,
      }}
    >{`${cellDetails.xLoc}, ${cellDetails.yLoc}`}</div>
  );
}
