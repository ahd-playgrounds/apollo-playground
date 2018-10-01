import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient }   from "apollo-client";
import { HttpLink }       from "apollo-link-http";
import { BatchHttpLink }  from "apollo-link-batch-http";
import { split }          from "apollo-link";
import { InMemoryCache }  from "apollo-cache-inmemory";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./App.css";

const uri = "/graphql";

//link to use if batching (default)
// also adds a `batch: true` header to the request to prove it's a different link
const batchHttpLink = new BatchHttpLink({ uri, headers: { batch: "true " } });
// link to use if not batching
const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
  // the link to use is a either the default or batch link
  link: split(
    operation => operation.getContext().important === true,
    httpLink, // if the test is true -- debatch
    batchHttpLink // otherwise, batching is fine
  ),
  cache: new InMemoryCache()
});

const Wrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
