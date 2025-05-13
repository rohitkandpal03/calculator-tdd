import React from "react";
import "./App.css";
import StringCalculator from "./components/StringCalculator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Calculator TDD</h1>
      </header>
      <main>
        <StringCalculator />
      </main>
    </div>
  );
}

export default App;
