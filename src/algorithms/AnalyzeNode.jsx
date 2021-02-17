// import React from "react";

import { StartNode, EndNode } from "../components/GridDetails";

function AnalyzeNode(pos) {
  let temp = document.getElementById(`${pos[0]}, ${pos[1]}`);
  //   console.log(temp);

  if (pos[0] === StartNode.xPos && pos[1] === StartNode.yPos) {
    //     return "start";
  } else if (pos[0] === EndNode.xPos && pos[1] === EndNode.yPos) {
    //     return "end";
  } else {
    temp.className = "grid visitedNode";
  }
}

export default AnalyzeNode;
