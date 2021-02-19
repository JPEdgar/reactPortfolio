import { StartNode, EndNode } from "../components/GridDetails";

function AnalyzeNode(pos) {
  let temp = document.getElementById(`${pos[0]}, ${pos[1]}`);

  if (pos[0] === StartNode.xPos && pos[1] === StartNode.yPos) {
    return "start";
  } else if (pos[0] === EndNode.xPos && pos[1] === EndNode.yPos) {
    console.log("found the end");
    return "end";
  } else if (!temp.className.includes("visited")) {
    temp.className = "grid visitedNode";
    return "unvisited";
  } else {
    // console.log(" - - - - in analyze else");
  }
}

export default AnalyzeNode;
