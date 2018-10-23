import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default function Rob() {
  return (
    <Query
      query={gql`
        {
          something
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error :(</p>;
        }

        return "hi";
      }}
    </Query>
  );
}
