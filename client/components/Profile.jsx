import React, { Component } from "react";
import { observer } from "mobx-react";
import { withMolecule } from "react-molecule";
import gql from "graphql-tag";
import { ReactiveQuery } from "apollo-live-client";

const GET_MESSAGES = gql`
  query {
    notifications {
      _id
      title
      text
    }
  }
`;

const SUBSCRIBE_MESSAGES = gql`
  subscription {
    notifications {
      event
      doc {
        _id
        title
        text
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

const PresentationalComponent = props => {
  console.log(props.data.notifications);
  return props.data.notifications.map(notification => (
    <div className="col-md-4">
      <h3>ID: {notification._id}</h3>
      <p>Title: {notification.title}</p>
      <p>Description: {notification.text}</p>
    </div>
  ));
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
        </div>
        <div className="row">
          <MessagesWithData />
        </div>
      </div>
    );
  }
}

export default withMolecule(App);
