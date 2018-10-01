import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default ({ bG, queryInfo, children }) => (
  <Query
    query={gql`
      {
        hello
        persons { # array
          ${queryInfo ? queryInfo: ''}
          ${bG ? bG : ''}
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      const { persons = {} } = data || {};

      return persons.map(({ name, age, luckLevel }) => (
        <div key={name}>
          <p>{`${name} is ${age}: luckLevel = ${luckLevel}`}</p>
          <p>----------</p>
          {children}
        </div>
      ));
    }}
  </Query>
);
