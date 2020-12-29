import React, { useState } from "react";

import { GridDetails, CellDetails, StartNode } from "./GridDetails";

import "./Grid.css";

let tempVar = 0;

export default function Grid() {
  const [getGrid, setGrid] = useState(() => InitializeGrid());
  const [getCount, setCount] = useState(0);
  console.log(getGrid);

  function TestFunction() {
    let tempID = 0;
    let i = 0;
    let j = 0;

    let tempArr = [...getGrid];
    const locArr = [];

    const anotherTemp = tempArr.filter((tempItem) => {
      let moreTemp = tempItem.props.id;
      if (moreTemp === getCount) {
        locArr[0] = parseInt(tempItem.props.children);
        locArr[1] = parseInt(
          tempItem.props.children.slice(locArr[0].length + 1)
        );
      }
      return moreTemp !== getCount;
    });

    while (i >= GridDetails.numRows) {
      i -= GridDetails.numRows;
      j++;
    }

    anotherTemp.push(BuildCell(getCount, j, "visitedNode", tempID));
    // console.log(anotherTemp.length);
    anotherTemp.sort((a, b) => {
      return a.props.id - b.props.id;
      // console.log(parseInt(a.props.children));
    });
    // console.log(parseInt(tempLoc));
    // console.log(anotherTemp);
    setCount((count) => count + 1);
    setGrid(anotherTemp);
  }

  function PrintGrid() {
    console.log(" - - - ");
    console.log(getGrid);
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
  let tempVar = 0;
  const gridArray = [];
  for (let i = 0; i < GridDetails.numCols; i++) {
    for (let j = 0; j < GridDetails.numRows; j++) {
      gridArray.push(BuildCell(i, j, "unvisitedNode", tempVar));
      // console.log(gridArray)
      tempVar++;
    }
  }
  return gridArray;
}

function BuildCell(i, j, className, id) {
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
      id={id}
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
