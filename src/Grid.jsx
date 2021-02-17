import React, { useState, useEffect } from "react";
import FindNeighbor from "./algorithms/FindNeighbor";
import InitializeGrid from "./components/InitializeGrid";
import { StartNode } from "./components/GridDetails";

const neighbors = [];

function Grid() {
  const [getGrid] = useState(InitializeGrid);
  const [search, setSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    setRenderCount((curr) => curr + 1);
  }, []);

  function clickMe() {
    // if (!search && !hasSearched) {
    //   setHasSearched(true);
    //   do {
        if (neighbors.length <= 0) {
          neighbors.push([StartNode.xPos, StartNode.yPos]);
        }

        let temp = FindNeighbor(neighbors.shift());

        if (temp.length > 0) {
          neighbors.push(...temp);
        }
        console.log("neighbors after push = ");
        console.log(neighbors);
    //   } while (!search);
    // }
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
