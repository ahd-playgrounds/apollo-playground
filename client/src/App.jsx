import React, { Component } from "react";

import logo from "./logo.svg";
import ApolloPiece from "./ApolloPiece";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ApolloPiece queryInfo="luckLevel">
          <p>poop</p>
        </ApolloPiece>
        <ApolloPiece queryInfo="name">
          <ApolloPiece bG="name age luckLevel" />
        </ApolloPiece>
        <ApolloPiece queryInfo="age" />
      </div>
    );
  }
}

export default App;
