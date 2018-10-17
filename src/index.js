import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

const uri = "/graphql";

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      // only useful for resolver kyes not matching __typname
      whoami: (_, args, { getCacheKey }) => {
        console.log("looking in cache key: ", args);
        return getCacheKey({ __typename: "Customer", id: args.id });
      }
    }
  }
});

const stateLink = withClientState({
  cache,
  resolvers: {} //needed
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, new HttpLink({ uri })])
});

const Wrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
