import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./App.css";

const client = new ApolloClient({
  uri: "/graphql"
});

const Wrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
