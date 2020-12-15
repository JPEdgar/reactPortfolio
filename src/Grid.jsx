import React, { useState } from "react";

import { GridDetails, CellDetails, StartNode } from "./GridDetails";

import "./Grid.css";

const searchArray = [[StartNode.xLoc, StartNode.yLoc]];

export default function Cell() {
  const [getGrid, setGrid] = useState(() => InitializeGrid());

  function TestFunction() {
    setGrid([...getGrid, (getGrid[0][0] = BuildCell(0, 0, "visitedNode"))]);
  }

  function TempSearch() {
    if (searchArray.length <= 0) {
      return;
    }
    const searchSpot = searchArray.shift();
    GetNeightbors(searchSpot, getGrid);
  }

  return (
    <>
      {getGrid}
      <button onClick={() => TestFunction()}>Test</button>
      <button onClick={() => TempSearch()}>Get Neighbors</button>
    </>
  );
}

function GetNeightbors(startSpot, getGrid) {
  const numRows = getGrid.length;
  const numCols = getGrid[0].length;
  const focalSpot = startSpot;
  const startNode = [StartNode.xLoc, StartNode.yLoc];
  let searchSpot = [];
  let searchSpotClass = "";

  console.log(searchSpot);
  console.log(getGrid[0][0].props.className);

  // up - (0, -1)
  searchSpot = [focalSpot[0], focalSpot[1] - 1];
  searchSpotClass = getGrid[searchSpot[0]][searchSpot[1]].props.className;
  if (
    searchSpot[1] < 0 || // top border
    (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
  ) {
    console.log("unread cell.  could be top border");
  } else {
    if (searchSpotClass.includes(" visitedNode")) {
      // visited node
    } else {
      // success!  Push location into searchArray and change class to "visitedNode"
      searchArray.push(searchSpot);
    }
  }

  // right - (+1, 0)
  searchSpot = [focalSpot[0] + 1, focalSpot[1]];
  if (
    searchSpot[1] >= numCols || // right border
    (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
  ) {
    console.log("unread cell.  could be right border");
  } else {
    if (searchSpotClass.includes(" visitedNode")) {
      // visited node
    } else {
      // success!  Push location into searchArray and change class to "visitedNode"
      searchArray.push(searchSpot);
    }
  }

  // down - (0, +1)
  searchSpot = [focalSpot[0], focalSpot[1] + 1];
  if (
    searchSpot[1] >= numRows || // bottom border
    (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
  ) {
    console.log("unread cell.  could be bottom border");
  } else {
    if (searchSpotClass.includes(" visitedNode")) {
      // visited node
    } else {
      // success!  Push location into searchArray and change class to "visitedNode"
      searchArray.push(searchSpot);
    }
  }

  // left - (-1, 0)
  searchSpot = [focalSpot[0] - 1, focalSpot[1]];
  if (
    searchSpot[1] < 0 || // left border
    (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
  ) {
    console.log("unread cell.  could be left border");
  } else {
    if (searchSpotClass.includes(" visitedNode")) {
      // visited node
    } else {
      // success!  Push location into searchArray and change class to "visitedNode"
      searchArray.push(searchSpot);
    }
  }

  console.log(searchArray);
}

function InitializeGrid() {
  const gridArray = [];
  for (let i = 0; i < GridDetails.numRows; i++) {
    gridArray.push([]);
    for (let j = 0; j < GridDetails.numCols; j++) {
      gridArray[i].push(BuildCell(i, j, "unvisitedNode"));
    }
  }
  return gridArray;
}

function BuildCell(i, j, className, delay) {
  let tempClass = className;

  const HandleClick = (e) => {
    console.log(e.target);
    let temp = e.target;
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
      key={`${i}, ${j}`}
      onClick={(e) => HandleClick(e)}
      className={`gridCell ${tempClass}`}
      style={{
        animation: `clickCell ${delay}s`, // this is the key to getting each individual cell to animate separately
        left: `${cellDetails.moveX}px`,
        top: `${cellDetails.moveY}px`,
        width: gridDetails.cellSize,
        height: gridDetails.cellSize,
      }}
    >{`${cellDetails.xLoc}, ${cellDetails.yLoc}`}</div>
  );
}
