import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import logo from "./logo.svg";
import ApolloPiece from "./ApolloPiece";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql"
});

async function get(url = "/api") {
  try {
    const data = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "GET"
    });

    const parsedData = await data.json();
    return parsedData;
  } catch (e) {
    console.log("oh dear!");
    return null;
  }
}

class App extends Component {
  componentDidMount() {
    console.log("oh hey there");
    this.getData();
    client
      .query({
        query: gql`
          {
            hello
            persons {
              luckLevel
              name
              age
            }
          }
        `
      })
      .then(result => console.log("apollo", result));
  }

  async getData() {
    console.log(await get());
  }

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
        <ApolloPiece />
      </div>
    );
  }
}

export default App;
