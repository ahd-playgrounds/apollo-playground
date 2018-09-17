import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => (
  <Query
    query={gql`
      {
        hello
        persons {
          luckLevel
          name
          age
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.persons.map(({ name, age }) => (
        <div key={name}>
          <p>{`${name} is ${age}`}</p>
        </div>
      ));
    }}
  </Query>
);
