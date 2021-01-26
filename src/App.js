import React from "react";
import Grid from "./Grid";
function App() {
  const setNum = 100;
  const [count, setCount] = React.useState(0);

  function Add() {
    for (let i = 0; i < setNum; i++) {
      console.log(i);
      setCount((currCount) => currCount + 1);
      // setCount (count + 1)
    }
  }
  return (
    <div>
      {/* <button onClick={() => Add()}>Click</button>
      {" " + count} */}
      <Grid />
    </div>
  );
}

export default App;
