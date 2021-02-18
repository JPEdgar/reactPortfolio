import { GridDetails } from "../components/GridDetails";
import AnalyzeNode from "./AnalyzeNode";

function FindNeighbor(currentPos, iteration) {
  // console.log(`searching ${currentPos}`);
  const xLoc = currentPos[0];
  const yLoc = currentPos[1];
  const neighbors = [];
  let doSearch = true;
  let nodeType = "";

  // top (0, -1)
  NodeTest([xLoc, yLoc - 1]);
  // right (+1, 0)
  NodeTest([xLoc + 1, yLoc]);
  // bottom (0, +1)
  NodeTest([xLoc, yLoc + 1]);
  // left (-1, 0)
  NodeTest([xLoc - 1, yLoc]);

  function NodeTest(searchSpot) {
    if (CheckNode(searchSpot) && doSearch) {
      nodeType = AnalyzeNode(searchSpot, iteration);
      if (nodeType === "unvisited") {
        neighbors.push(searchSpot);
      } else if (nodeType === "end") {
        doSearch = false;
      } else if (nodeType === "start") {
        //
      } else {
        // console.log(`- - - - ${searchSpot} in else`);
      }
    }
  }
  return { array: neighbors, search: doSearch };
}

export default FindNeighbor;

// checks to see if node is in grid borders
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
