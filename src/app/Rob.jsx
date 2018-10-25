import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Hider from "./Hider";
import Terry from "./Terry";

console.log('added something');
export default function Rob() {
  return (
    <Query
      variables={{ idPersons: "1234", user_token: "890" }}
      query={gql`
        query MainQuery($idPersons: ID!, $user_token: ID!) {
          whoami(id: $user_token) {
            id
            name
          }
          persons(id: $idPersons) {
            id
            age
            name
            luckLevel
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>Error :(</p>;
        }

        const { persons = {} } = data || {};

        return persons.map(({ name, age, luckLevel }) => (
          <div key={name}>
            <p>{`${name} is ${age}: luckLevel = ${luckLevel}`}</p>
            <p>----------</p>
            <Hider show={false}>
              <Terry />
            </Hider>
          </div>
        ));
      }}
    </Query>
  );
}
