import React, { Component } from "react";
import { observer } from "mobx-react";
import { withMolecule } from "react-molecule";
import gql from "graphql-tag";
import { ReactiveQuery } from "apollo-live-client";

const GET_MESSAGES = gql`
  query {
    messages {
      _id
      text
      createdAt
    }
  }
`;

const SUBSCRIBE_MESSAGES = gql`
  subscription {
    messages {
      event
      doc {
        _id
        text
        createdAt
      }
    }
  }
`;

const Loading = () => {
  return <p>...loading</p>;
};

const Error = props => {
  console.log(props.error);
  return <p>Some error have occured</p>;
};

const PresentationalComponent = () => {
  return <p>This is your data</p>;
};

const MessagesWithData = () => (
  <ReactiveQuery
    query={GET_MESSAGES}
    subscription={SUBSCRIBE_MESSAGES}
    // variables={{ threadId: "XXX" }}
  >
    {({ data, loading, error }) => {
      if (loading) return <Loading />;
      if (error) return <Error error={error} />;

      return <PresentationalComponent data={data} />;
    }}
  </ReactiveQuery>
);

@observer(["store"])
class App extends Component {
  render() {
    const { molecule } = this.props;
    const { agents } = molecule;
    const { user: userAgent } = agents;
    const { user } = userAgent.store;

    const { username, _id } = user;
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-4">User Profile</h2>
            <p className="text-secondary">
              username: {username !== undefined && username}
            </p>
            <p className="text-secondary">id: {_id !== undefined && _id}</p>
          </div>
          <MessagesWithData />
        </div>
      </div>
    );
  }
}

export default withMolecule(App);
