import { StartNode, EndNode } from "../components/GridDetails";

function AnalyzeNode(pos, iteration) {
  let temp = document.getElementById(`${pos[0]}, ${pos[1]}`);

  if (pos[0] === StartNode.xPos && pos[1] === StartNode.yPos) {
    return "start";
  } else if (pos[0] === EndNode.xPos && pos[1] === EndNode.yPos) {
    console.log("found the end");
    return "end";
  } else if (!temp.className.includes("visited")) {
    let animDelay = 0;
    if (iteration > 20) {
      animDelay = 20;
    } else {
      animDelay = iteration;
    }
    // temp.style.animationDelay = "2s";
    temp.style.animationDuration = `${animDelay * 0.1}s`;
    temp.className = "grid visitedNode";
    return "unvisited";
  } else {
    // console.log(" - - - - in analyze else");
  }
}

export default AnalyzeNode;
