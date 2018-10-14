import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient }   from "apollo-client";
import { HttpLink }       from "apollo-link-http";
import { BatchHttpLink }  from "apollo-link-batch-http";
import { InMemoryCache }  from "apollo-cache-inmemory";
import { withClientState }  from "apollo-link-state";
import { ApolloLink } from "apollo-link";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./App.css";

const uri = "/graphql";

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      whoami: (_, args, { getCacheKey }) => {
        console.log('looking in cache key: ', args)
        return getCacheKey({ __typename: 'Customer', id: args.id })
      }
    },
  },
});

const stateLink = withClientState({
  cache,
  resolvers: {} //needed
});

//link to use if batching (default)
// also adds a `batch: true` header to the request to prove it's a different link
// const batchHttpLink = new BatchHttpLink({ uri, headers: { batch: "true " } });
// // link to use if not batching
// const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
  cache,
  // // the link to use is a either the default or batch link
  // link: split(
  //   operation => operation.getContext().important === true,
  //   httpLink, // if the test is true -- debatch
  //   batchHttpLink, // otherwise, batching is fine
  //   stateLink,
  // ),
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri })
  ]),
});

const Wrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Wrapper />, document.getElementById("root"));
registerServiceWorker();
