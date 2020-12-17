import React, { useState } from "react";

import { GridDetails, CellDetails, StartNode } from "./GridDetails";

import "./Grid.css";

const searchArray = [[StartNode.xLoc, StartNode.yLoc]];

export default function Cell() {
  const [getGrid, setGrid] = useState(() => InitializeGrid());
const [getCount, setCount] = useState(0)
  function TestFunction() {
    setGrid([...getGrid, (getGrid[getCount][0] = BuildCell(0, 0, "visitedNode"))]); // this works.  build setState off of this.
    setCount(getCount + 1)
    console.log(getGrid);
  }

  function TempSearch() {
    if (searchArray.length <= 0) {
      return;
    }
    let tempArray = [];
    let focusSpot;
    const searchSpot = searchArray.shift();
    if (GetNeightbors(searchSpot, "up")) {
      // up - (0, -1)
      focusSpot = [searchSpot[0], searchSpot[1] - 1];
      console.log(focusSpot);
      setGrid([
        ...getGrid,
        (getGrid[focusSpot[0]][focusSpot[1]] = BuildCell(
          focusSpot[0],
          focusSpot[1],
          "visitedNode"
        )),
      ]);
    }
    if (GetNeightbors(searchSpot, "right ")) {
      // right - (+1, 0)
      setGrid([
        ...getGrid,
        BuildCell(searchSpot[0] + 1, searchSpot[1], "visitedNode"),
      ]);
    }
    //  tempArray = ;
  }

  return (
    <>
      {getGrid}
      <button onClick={() => TestFunction()}>Test</button>
      <button onClick={() => TempSearch()}>Get Neighbors</button>
      <p>{getCount}</p>
    </>
  );
}

function GetNeightbors(startSpot, direction) {
  let tempGrid = []; // needs to set the getGrid to this array and modify/return this array.
  //   const returnGrid = [...getGrid];
  const numRows = GridDetails.numRows; // why do I need the grid again?  This info is in GridDetails.js
  const numCols = GridDetails.numCols; // why do I need the grid again?  This info is in GridDetails.js
  const focalSpot = startSpot;
  const startNode = [StartNode.xLoc, StartNode.yLoc];
  let searchSpot = [];
  let searchSpotClass = "";

  if (direction === "up") {
    // up - (0, -1)
    searchSpot = [focalSpot[0], focalSpot[1] - 1];

    if (
      searchSpot[1] < 0 || // top border
      (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
    ) {
      console.log("unread cell.  could be top border");
      return false;
    } else {
      if (searchSpotClass.includes(" visitedNode")) {
        // visited node
      } else {
        // success!  Push location into searchArray and change class to "visitedNode"
        searchArray.push(searchSpot);
        return true;
      }
    }
  } else if (direction === "right") {
    // right - (+1, 0)
    searchSpot = [focalSpot[0] + 1, focalSpot[1]];
    if (
      searchSpot[1] >= numCols || // right border
      (searchSpot[0] === startNode[0] && searchSpot[1] === startNode[1]) // start node location
    ) {
      console.log("unread cell.  could be right border");
      return false;
    } else {
      if (searchSpotClass.includes(" visitedNode")) {
        // visited node
      } else {
        // success!  Push location into searchArray and change class to "visitedNode"
        searchArray.push(searchSpot);
        return true;
      }
    }
  }
}

//  } else if (direction === "down") {
//    //
//  } else if (direction === "left") {
//    //
//  } else {
//    //
//  }

//  searchSpotClass = tempGrid[searchSpot[0]][searchSpot[1]].props.className;
//   console.log(`searchSpot = ${searchSpot}`);
/*



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
   } 
   
   else {
      if (searchSpotClass.includes(" visitedNode")) {
         // visited node
      } else {
         // success!  Push location into searchArray and change class to "visitedNode"
         searchArray.push(searchSpot);
      }
   }
*/

function InitializeGrid() {
  const gridArray = [];
  for (let i = 0; i < GridDetails.numCols; i++) {
    gridArray.push([]);
    for (let j = 0; j < GridDetails.numRows; j++) {
      gridArray[i].push(BuildCell(i, j, "unvisitedNode"));
    }
  }
  return gridArray;
}

function BuildCell(i, j, className, delay) {
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
        //   animation: `clickCell ${delay}s`, // this is the key to getting each individual cell to animate separately
        left: `${cellDetails.moveX}px`,
        top: `${cellDetails.moveY}px`,
        width: gridDetails.cellSize,
        height: gridDetails.cellSize,
      }}
    >{`${cellDetails.xLoc}, ${cellDetails.yLoc}`}</div>
  );
}
