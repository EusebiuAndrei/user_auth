import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";

import { Meteor } from "meteor/meteor";
import { initialize } from "meteor/cultofcoders:apollo";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import client from "./holdClient";

const QUERY = gql`
  query {
    sayHello
  }
`;

const App = () => (
  <Query query={QUERY}>
    {(data, loading, error) => {
      console.log("!!!", data.sayHello);
    }}
  </Query>
);

const GiveMeSomeOutput = () => {
  console.log("sss", QUERY);
  const sth = QUERY;
  return (
    <div className="container">
      <h1>App title</h1>
      <p>App content</p>
      <p>{QUERY.sayHello}</p>
    </div>
  );
};

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
      <GiveMeSomeOutput />
    </ApolloProvider>,
    document.getElementById("app")
  );
});
