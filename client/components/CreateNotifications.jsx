import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const NOTIFICATION_MUTATION = gql`
  mutation createNotification($title: String!, $text: String!) {
    createNotification(title: $title, text: $text) {
      _id
      title
      text
    }
  }
`;

class CreateNotifications extends Component {
  state = {
    notif: {
      title: "",
      text: ""
    }
  };

  handleUserFieldChange = (userField, userData) => {
    const notif = this.state.notif;
    notif[userField] = userData;
    this.setState({ notif });
  };

  displayErrors = error => {
    if (error) {
      return (
        <div className="mt-3">
          <h3>Try again</h3>
          <pre>
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </pre>
        </div>
      );
    }
  };

  render() {
    const { title, text } = this.state.notif;

    return (
      <Mutation
        mutation={NOTIFICATION_MUTATION}
        variables={{ title, text }}
        onError={() => {}}
      >
        {(addUser, result) => {
          const { data, loading, error, called } = result;
          return (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-auto">
                  <form onSubmit={addUser}>
                    <div className="form-group">
                      <label htmlFor="notif-title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="notif-title"
                        name="title"
                        placeholder="Notification title"
                        value={title}
                        onChange={e =>
                          this.handleUserFieldChange("title", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="notif-text">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="notif-text"
                        name="text"
                        value={text}
                        onChange={e =>
                          this.handleUserFieldChange("text", e.target.value)
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Create notification
                    </button>
                  </form>
                  {/* {this.displayErrors(error)} */}
                </div>
              </div>
            </div>
          );
          // console.log("first", data);
          // if (!called || error) {
          //   return (
          //     <div className="container mt-5">
          //       <div className="row justify-content-center">
          //         <div className="col-md-auto">

          //           {this.displayErrors(error)}
          //         </div>
          //       </div>
          //     </div>
          //   );
          // }

          // if (loading) {
          //   return <div>LOADING</div>;
          // }

          // if (newUser) {
          //   user.updateUser(newUser);
          //   const { username, _id } = newUser;

          //   return <div>{`Created ${username} with id ${_id}`}</div>;
          // } else {
          //   return null;
          // }
        }}
      </Mutation>
    );
  }
}

export default CreateNotifications;
