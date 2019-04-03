import React, { Component } from "react";
import { observer } from "mobx-react";
import { withMolecule } from "react-molecule";
import gql from "graphql-tag";
import { ReactiveQuery } from "apollo-live-client";

import CreateNotifications from "./CreateNotifications";

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

const cardStyle = {
  backgroundColor: "#52b461"
};

const PresentationalComponent = props => {
  console.log(props.data.notifications);
  return props.data.notifications.map(notification => (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body text-white" style={cardStyle}>
          <h5 className="card-title">{notification.title}</h5>
          <p className="card-text">{notification.text}</p>
          {/* <pre className="text-white">ID: {notification._id}</pre> */}
          {/* <a href="#" class="btn btn-primary">
              Go somewhere
            </a> */}
        </div>
      </div>
    </div>
  ));
};

const MessagesWithData = props => (
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
class Profile extends Component {
  render() {
    const { molecule } = this.props;
    const { agents } = molecule;
    const { user: userAgent } = agents;
    const { user } = userAgent.store;
    const { username, _id } = user;

    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-6 text-center">
            <h2 className="mb-4">User Profile</h2>
            <p className="text-secondary">
              username: {username !== undefined && username}
            </p>
            <p className="text-secondary">id: {_id !== undefined && _id}</p>
          </div>
          <div className="col-md-6">
            {username !== undefined && <CreateNotifications />}
          </div>
        </div>
        <div className="row">
          {/* {username !== undefined && <MessagesWithData />} */}
          <MessagesWithData />
        </div>
      </div>
    );
  }
}

export default withMolecule(Profile);
