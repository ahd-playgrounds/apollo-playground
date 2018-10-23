import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

const uri = "/graphql";

const client = new ApolloClient({ uri });

const Wrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
