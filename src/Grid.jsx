import React, { useState, useEffect } from "react";

import FindNeighbor from "./algorithms/FindNeighbor";
import InitializeGrid from "./components/InitializeGrid";
import { StartNode } from "./components/GridDetails";

let neighbors = [];

function Grid() {
  let search = true;
  const [getGrid] = useState(InitializeGrid);

  const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    setRenderCount((curr) => curr + 1);
  }, []);

  function clickMe() {
    let i = 0;
    while (search) {
      // do {
      // console.log(i);
      if (neighbors.length <= 0) {
        neighbors.push([StartNode.xPos, StartNode.yPos]);
      }
      const getNeighbors = FindNeighbor(neighbors.shift(), i);

      if (getNeighbors.array.length > 0) {
        neighbors.push(...getNeighbors.array);
      }
      search = getNeighbors.search;
      i++;
      // } while (i < 40); 
    }
    neighbors = [];
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

export default Grid;
