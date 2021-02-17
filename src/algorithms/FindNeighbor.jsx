import { GridDetails } from "../components/GridDetails";
import AnalyzeNode from "./AnalyzeNode";

function FindNeighbor(currentPos) {
  const xLoc = currentPos[0];
  const yLoc = currentPos[1];
  const neighbors = [];
  let searchSpot = [];

  // top (0, -1)
  searchSpot = [xLoc, yLoc - 1];
  if (CheckNode(searchSpot)) {
      AnalyzeNode(searchSpot)
    neighbors.push(searchSpot);
  }
  // right (+1, 0)
  searchSpot = [xLoc + 1, yLoc];
  if (CheckNode(searchSpot)) {
    AnalyzeNode(searchSpot)
    neighbors.push(searchSpot);
  }
  // bottom (0, +1)
  searchSpot = [xLoc, yLoc + 1];
  if (CheckNode(searchSpot)) {
    AnalyzeNode(searchSpot)
    neighbors.push(searchSpot);
  }
  // left (-1, 0)
  searchSpot = [xLoc - 1, yLoc];
  if (CheckNode(searchSpot)) {
    AnalyzeNode(searchSpot)
    neighbors.push(searchSpot);
  }

  return neighbors;
}

export default FindNeighbor;

function CheckNode(pos) {
  if (
    pos[1] >= 0 &&
    pos[0] < GridDetails.numCols &&
    pos[1] < GridDetails.numRows &&
    pos[0] >= 0
  ) {
    return true;
  } else {
    return false;
  }
}
