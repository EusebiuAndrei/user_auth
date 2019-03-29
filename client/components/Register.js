import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const REGISTER_MUTATION = gql`
  mutation createUser {
    createUser(
      username: "user17"
      email: "user17@yahoo.com"
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

const Register = () => {
  return (
    <Mutation mutation={REGISTER_MUTATION} onError={() => {}}>
      {(addUser, result) => {
        const { data, loading, error, called } = result;
        if (!called) {
          return (
            <div>
              {/* <input
                  placeholder="Username"
                  value={username}
                  onChange={e => this.setState({ username: e.target.value })}
                /> */}
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
        updateUser(data.user);

        if (user) {
          const { username, _id } = user;

          return <div>{`Created ${username} with id ${_id}`}</div>;
        } else {
          return null;
        }
      }}
    </Mutation>
  );
};

export default Register;
