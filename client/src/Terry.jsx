import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default function Terry(props) {
  return (
    <Query
      query={gql`
        query ExtraQuery($idPersons: ID!, $user_token: ID!) {
          whoami(id: $user_token) {
            id
            name
          }
          persons(id: $idPersons) {
            id
            age
          }
          something
        }
      `}
      variables={{ idPersons: "1234", user_token: "890" }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          debugger
          return <p>Error :(</p>;
        }

        const { persons = [], whoami = {} } = data || {};
        console.log(data)

        return persons.map(({ name, age, luckLevel }) => (
          <div key={name}>
            <p>{`${name} is ${age}: luckLevel = ${luckLevel}`}</p>
            <p>{whoami.name}</p>
            <p>----------</p>
          </div>
        ));
      }}
    </Query>
  );
}
