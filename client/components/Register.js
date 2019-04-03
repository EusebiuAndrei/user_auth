import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { observer } from "mobx-react";
import { withRouter } from "react-router";

const REGISTER_MUTATION = gql`
  mutation create(
    $username: String!
    $email: String!
    $plainPassword: String!
  ) {
    createUser(
      username: $username
      email: $email
      plainPassword: $plainPassword
    ) {
      token
      user {
        _id
        username
        emails {
          address
          verified
        }
      }
    }
  }
`;

@observer(["store"])
class Register extends Component {
  state = {
    user: {
      username: "",
      email: "",
      plainPassword: ""
    }
  };

  handleUserFieldChange = (userField, userData) => {
    const user = this.state.user;
    user[userField] = userData;
    this.setState({ user });
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
    const { username, email, plainPassword } = this.state.user;

    return (
      <Mutation
        mutation={REGISTER_MUTATION}
        variables={{ username, email, plainPassword }}
        onCompleted={() => this.props.history.push("/")}
        onError={() => {}}
      >
        {(addUser, result) => {
          const { data, loading, error, called } = result;
          if (!called || error) {
            return (
              <div className="container mt-5">
                <div className="row justify-content-center">
                  <div className="col-md-auto">
                    <form onSubmit={addUser}>
                      <div className="form-group">
                        <label htmlFor="user-name">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-name"
                          name="username"
                          placeholder="How would you like to be called?"
                          value={username}
                          onChange={e =>
                            this.handleUserFieldChange(
                              "username",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="user-email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-email"
                          name="email"
                          value={email}
                          onChange={e =>
                            this.handleUserFieldChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="user-password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="user-password"
                          name="plainPassword"
                          value={plainPassword}
                          onChange={e =>
                            this.handleUserFieldChange(
                              "plainPassword",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => console.log(plainPassword)}
                      >
                        Register
                      </button>
                    </form>
                    {this.displayErrors(error)}
                  </div>
                </div>
              </div>
            );
          }

          if (loading) {
            return <div>LOADING</div>;
          }

          const { molecule } = this.props;
          const { agents } = molecule;
          const { user } = agents;

          const { createUser } = data;
          const { user: newUser } = createUser;

          if (newUser) {
            user.updateUser(newUser);
            const { username, _id } = newUser;

            return <div>{`Created ${username} with id ${_id}`}</div>;
          } else {
            return null;
          }
        }}
      </Mutation>
    );
  }
}

export default withRouter(Register);
