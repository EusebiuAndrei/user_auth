import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

//components
import Register from "./Register";

const QUERY = gql`
  query {
    sayHello
  }
`;

class App extends Component {
  user = "";
  render() {
    return (
      <div>
        <Query query={QUERY}>
          {(response, loading, error) => {
            console.log("!!!", response.data.sayHello);
            return <p>sa</p>;
          }}
        </Query>
        <Register />
      </div>
    );
  }
}

export default App;
