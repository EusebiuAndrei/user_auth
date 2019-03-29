import React, { Component } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";

import { Meteor } from "meteor/meteor";
import { initialize } from "meteor/cultofcoders:apollo";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import client from "./holdClient";

import { decorate, observable, action } from "mobx";
import { observer } from "mobx-react";

//components
import App from "./components/App";

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("app")
  );
});
