import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {observable, action} from "mobx";
import {observer} from 'mobx-react';

const REGISTER_MUTATION = gql`
  mutation createUser($username: String!, $email: String!) {
    createUser(
      username: "user_test"
      email: "user_test@yahoo.com"
      plainPassword: "12345"
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

class Register extends Component {
  @observable newUser = {};

  @action addCreateInfo(userField, fieldData) {
    this.newUser[userField] = fieldData;
    console.log(userField, this.newUser[userField]);
  }

  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION} variables={{ username: this.newUser.username, email: this.newUser.email }}  onError={() => {}}>
        {(addUser, result) => {
          const { data, loading, error, called } = result;
          if (!called) {
            return (
              <div>
                <input
                    placeholder="Username"
                    value={this.newUser.username}
                    onChange={
                    e => this.addCreateInfo("username", e.target.value)}
                  />
                <input
                    placeholder="Email"
                    value={this.newUser.email}
                    onChange={
                    e => this.addCreateInfo("email", e.target.value)}
                  />
                <button data-testid="add-user-button" onClick={addUser}>
                  Create new user
                </button>
              </div>
            );
          }
          if (loading) {
            return <div>LOADING</div>;
          }
          if (error) {
            return <div>ERROR</div>;
          }

          const { createUser } = data;
          //updateUser(data.user);

          if (user) {
            const { username, _id } = user;

            return <div>{`Created ${username} with id ${_id}`}</div>;
          } else {
            return null;
          }
        }}
      </Mutation>
    );
  }
};

export default Register;
