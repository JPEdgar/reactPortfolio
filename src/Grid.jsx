import React, { useState, useEffect } from "react";

import FindNeighbor from "./algorithms/FindNeighbor";
import InitializeGrid from "./components/InitializeGrid";
import { StartNode, EndNode } from "./components/GridDetails";

export default function Grid() {
  let search = true;
  const [getGrid] = useState(InitializeGrid);

  const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    setRenderCount((curr) => curr + 1);
  }, []);

  function clickMe() {
    const neighbors = [];
    while (search) {
      if (neighbors.length <= 0) {
        neighbors.push([StartNode.xPos, StartNode.yPos]);
      }
      const getNeighbors = FindNeighbor(neighbors.shift());

      if (getNeighbors.array.length > 0) {
        neighbors.push(...getNeighbors.array);
      }

      if (neighbors.length <= 0) {
        search = false;
      } else {
        search = getNeighbors.search;
      }
    }
    if (neighbors.length > 0) {
      const pathArray = BuildPath();
      AnimatePath(pathArray);
    } else console.log("no end discovered");
  }

  // builds an array for the return path
  function BuildPath() {
    const endNode = document.getElementById(`${EndNode.xPos}, ${EndNode.yPos}`);
    // console.log("current expected route:");
    // console.log(endNode);
    // console.log(document.getElementById("3, 3"));
    // console.log(document.getElementById("3, 2"));
    // console.log(document.getElementById("2, 2"));
    // console.log(" - - - - - ");

    const path = [];
    let buildPath = true;
    let childNode = "";
    let parentNode = "";

    do {
      if (path.length <= 0) {
        childNode = endNode.getAttribute("node-parent");
        path.push(childNode);
      } else {
        childNode = parentNode;
      }
      const tempObj = document.getElementById(`${childNode}`);
      parentNode = tempObj.getAttribute("node-parent");
      // console.log(parentNode);
      if (parentNode === `${StartNode.xPos}, ${StartNode.yPos}`) {
        buildPath = false;
      } else {
        path.push(parentNode);
      }
    } while (buildPath);
    return path;
  }

  function AnimatePath(pathArray) {
    pathArray.forEach((step) => {
      setTimeout(() => {
        const temp = document.getElementById(step);
        // console.log(temp);
        temp.className = "grid path";
      }, 2000);
    });
  }

  return (
    <>
      <button onClick={() => clickMe()}>Click</button>
      <button onClick={() => console.log(getGrid)}>getGrid</button>
      <h3>Render count = {renderCount}</h3>
      {getGrid.map((cell, key) => {
        return cell;
      })}
    </>
  );
}
