import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {observer} from 'mobx-react';

const LOGIN_MUTATION = gql`
  mutation loginUser($username: String!, $plainPassword: String!) {
    loginWithPassword(username: $username, plainPassword: $plainPassword) {
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
class Login extends Component {
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
    this.setState({user});
  }

  displayErrors = (error) => {
    if(error) {
      return (
        <div className="mt-3">
          <h3>Try again</h3>
          <pre>{error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}</pre>
        </div>);
    }
  }

  render() {
    const { username, plainPassword } = this.state.user;

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={{ username, plainPassword }} onCompleted={() => this.props.history.push('/')} onError={() => {}}>
        {(addUser, result) => {
          const { data, loading, error, called } = result;
          console.log("first", data);
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
                          onChange={
                            e => this.handleUserFieldChange("username", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="user-password">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-password"
                          name="plainPassword"
                          value={plainPassword}
                          onChange={
                          e => this.handleUserFieldChange("plainPassword", e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Log in
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

          const { loginWithPassword } = data;
          const { user: newUser } = loginWithPassword;
          this.props.store.updateUser(newUser);

          if (newUser) {
            const { username, _id } = newUser;

            return <div>{`Created ${username} with id ${_id}`}</div>;
          } else {
            return null;
          }
        }}
      </Mutation>
    );
  }
};

export default Login;
