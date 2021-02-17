import BuildCell from "./BuildCell";
import { GridDetails } from "./GridDetails";

function InitializeGrid() {
  const grid = [];

  for (let i = 0; i < GridDetails.numRows; i++) {
    grid.push([]);
    for (let j = 0; j < GridDetails.numCols; j++) {
      grid[i].push(BuildCell(i, j));
    }
  }
  return grid;
}

export default InitializeGrid;
