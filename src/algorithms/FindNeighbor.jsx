import { GridDetails } from "../components/GridDetails";
import AnalyzeNode from "./AnalyzeNode";

export default function FindNeighbor(currentPos) {
  // console.log(`searching ${currentPos}`);
  // const currObj = document.getElementById(`${currentPos[0]}, ${currentPos[1]}`);
  // const cellData = {
  //   xPos: currObj.getAttribute("x-pos"),
  //   yPos: currObj.getAttribute("y-pos"),
  //   wasVisited: currObj.getAttribute("was-visited"),
  //   nodeDistance: currObj.getAttribute("node-distance"),
  //   nodeParent: currObj.getAttribute("node-parent"),
  // };

  // console.log("currentObj data = ");
  // console.log(cellData);

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
      nodeType = AnalyzeNode(searchSpot);
      if (nodeType === "unvisited") {
        const targetObj = document.getElementById(`${searchSpot[0]}, ${searchSpot[1]}`);
        const currObj = document.getElementById(`${currentPos[0]}, ${currentPos[1]}`);
        const tempDistance = parseInt(currObj.getAttribute("node-distance"));
        if (tempDistance < 0) {
          targetObj.setAttribute("node-distance", 1);
        } else {
          targetObj.setAttribute("node-distance", tempDistance + 1);
        }
        targetObj.setAttribute("was-visited", "true");
        targetObj.setAttribute("node-parent", `${currentPos[0]}, ${currentPos[1]}`);

        neighbors.push(searchSpot);
      } else if (nodeType === "end") {
        const targetObj = document.getElementById(`${searchSpot[0]}, ${searchSpot[1]}`);
        const currObj = document.getElementById(`${currentPos[0]}, ${currentPos[1]}`);
        const tempDistance = parseInt(currObj.getAttribute("node-distance"));
        if (tempDistance < 0) {
          targetObj.setAttribute("node-distance", 1);
        } else {
          targetObj.setAttribute("node-distance", tempDistance + 1);
        }
        targetObj.setAttribute("was-visited", "true");
        targetObj.setAttribute("node-parent", `${currentPos[0]}, ${currentPos[1]}`);
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
