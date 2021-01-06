import React, { useState } from "react";

import { GridDetails, CellDetails, StartNode, EndNode } from "./GridDetails";

import "./Grid.css";

let searchArray = [[StartNode.xLoc, StartNode.yLoc]];

export default function Grid() {
  const [getGrid, setGrid] = useState(() => InitializeGrid());
  const [getCount, setCount] = useState(0);
  console.log("grid rendered");

  function RebuildCell(tempI) {
    let i = tempI;
    let j = 0;

    // local state in Grid()
    let tempArr = [...getGrid];
    const locArr = [];

    // creates an array with the modified row filtered out
    const anotherTemp = tempArr.filter((tempItem) => {
      let moreTemp = tempItem.props.id;
      if (moreTemp === tempI) {
        locArr[0] = parseInt(tempItem.props.children);
        locArr[1] = parseInt(
          tempItem.props.children.slice(locArr[0].length + 1)
        );
      }
      return moreTemp !== tempI;
    });

    // creates the keys for rows/cols
    while (i >= GridDetails.numRows) {
      i -= GridDetails.numRows;
      j++;
    }
    // console.log(`i=${i}, j=${j}`);

    anotherTemp.push(BuildCell(j, i, "visitedNode", tempI));
    anotherTemp.sort((a, b) => {
      return a.props.id - b.props.id;
    });

    // these two are states and local to Grid()
    // since setState() is async, need to get the state properly updated.
    // currently, state is overriding itself.  (3, 3) is "unvisited" because of this.
    setCount((count) => count + 1);
    setGrid((currGrid) => (currGrid = [...anotherTemp]));
  }

  function LogArray() {
    console.log(searchArray);
  }

  function PrintGrid() {
    console.log(" - - - ");
    console.log(getGrid);
  }

  function FindNeighbor() {
    let searchSpot;
    let tempInfo = {
      rebuildCell: false,
      iLoc: 0,
    };

    if (searchArray.length <= 0) {
      return;
    }

    searchSpot = searchArray.shift();

    tempInfo = SearchNeighbors(searchSpot, "up", getGrid);
    if (tempInfo.rebuildCell) {
      RebuildCell(tempInfo.iLoc);
    }
    console.log("~ ~ ~ ~ ~ ~");
    console.log("up");
    console.log(tempInfo);

    tempInfo = SearchNeighbors(searchSpot, "right", getGrid);
    if (tempInfo.rebuildCell) {
      RebuildCell(tempInfo.iLoc);
    }
    console.log("right");
    console.log(tempInfo);
    tempInfo = SearchNeighbors(searchSpot, "down", getGrid);
    if (tempInfo.rebuildCell) {
      RebuildCell(tempInfo.iLoc);
    }
    console.log("down");
    console.log(tempInfo);
    tempInfo = SearchNeighbors(searchSpot, "left", getGrid);
    if (tempInfo.rebuildCell) {
      RebuildCell(tempInfo.iLoc);
    }
    console.log("left");
    console.log(tempInfo);
  }

  return (
    <>
      {getGrid}
      <button onClick={() => RebuildCell(getCount)}>Test</button>
      <button onClick={() => PrintGrid()}>Print Grid</button>
      <button onClick={() => FindNeighbor()}>Find Neighbor</button>
      <button onClick={() => LogArray()}>Log Array</button>
    </>
  );
}

function SearchNeighbors(searchSpot, dir, grid) {
  let focusSpot; // the cell to be analyzed

  // initialize where the search is focusing
  if (dir === "up") {
    // 0, -1
    focusSpot = [searchSpot[0], searchSpot[1] - 1];
  } else if (dir === "right") {
    // +1, 0
    focusSpot = [searchSpot[0] + 1, searchSpot[1]];
  } else if (dir === "down") {
    // 0, +1
    focusSpot = [searchSpot[0], searchSpot[1] + 1];
  } else if (dir === "left") {
    // -1, 0
    focusSpot = [searchSpot[0] - 1, searchSpot[1]];
  }

  // checks to see if the focus is over a border
  if (focusSpot[1] < 0) {
    console.log("top border");
    return { rebuildCell: false };
  } else if (focusSpot[0] >= GridDetails.numCols) {
    console.log("right border");
    return { rebuildCell: false };
  } else if (focusSpot[1] >= GridDetails.numRows) {
    console.log("bottom border");
    return { rebuildCell: false };
  } else if (focusSpot[0] < 0) {
    console.log("left border");
    return { rebuildCell: false };
  }

  // check to see if focus is start node
  if (focusSpot[0] === StartNode.xLoc && focusSpot[1] === StartNode.yLoc) {
    console.log("is start node");
    return { rebuildCell: false };

    // check to see if focus is end node
  } else if (focusSpot[0] === EndNode.xLoc && focusSpot[1] === EndNode.yLoc) {
    console.log("is end node");
    searchArray = [];
    return { rebuildCell: false };
  }

  // setup for visited test
  const tempGrid = [...grid];
  const tempCell = tempGrid.filter((cell) => {
    if (cell.props.children === focusSpot[0] + ", " + focusSpot[1]) {
      return cell;
    }
  });
  /*
    console.log(`looking ${dir}`)
  console.log("focus = ")
  console.log(focusSpot)
  console.log("tempCell = ");
  console.log(tempCell[0])
  console.log("- - - - - - - -")

            */
  // checks to see if focus has been visited
  if (tempCell[0].props.className.includes(" visitedNode")) {
    return { rebuildCell: false };
  }

  // if all tests are true, push spot in searchArray and return true for cell rebuild
  searchArray.push(focusSpot);
  return { rebuildCell: true, iLoc: tempCell[0].props.id };
}

function InitializeGrid() {
  let tempVar = 0;
  const gridArray = [];
  for (let i = 0; i < GridDetails.numCols; i++) {
    for (let j = 0; j < GridDetails.numRows; j++) {
      gridArray.push(BuildCell(i, j, "unvisitedNode", tempVar));
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
  } else if (i === EndNode.xLoc && j === EndNode.yLoc) {
    cellDetails = { ...EndNode };
    tempClass = cellDetails.className;
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
