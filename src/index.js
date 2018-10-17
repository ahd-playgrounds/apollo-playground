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
  resolvers: {
    Query: {
      cms: async (_, args, arg2) => {
        try {
          const load = await fetch("/api/content");
          const messyData = await load.json();

          const data = messyData; // tidy as much as needs be
          return {
            __typename: "Data",
            data // key matches query and that seems to be it
          };
        } catch (e) {
          console.error(e);
          return null; // return null so the rest of the query is fine
          throw e; // or throw to surface
        }
      }
    }
  }
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
