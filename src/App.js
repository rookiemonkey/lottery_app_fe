import React from "react";
import Detail from "./components/Detail";
import JoinForm from "./components/JoinForm";
import PickWinner from "./components/PickWinner";

// BUGS:
// - the manager can join the lottery
// - an account can join multiple times which increases the chance of winning
// - can identify what address won the lottery

const App = () => {
  return (
    <div className="App">
      <Detail />
      <JoinForm />
      <PickWinner />
    </div>
  )
}

export default App;
