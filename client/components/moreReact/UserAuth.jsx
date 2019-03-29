import React, { Component } from "react";

//components
import Login from "./Login";
import Register from "./Register";

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        fullName: "",
        age: ""
      }
    };
  }

  handleFormSubmit = (e, authType) => {
    e.preventDefault();
    //Do some backend stuff here
    console.log(this.state.user);
    //Cleaning the inputs
    const user = {
      name: "",
      email: "",
      password: "",
      fullName: "",
      age: ""
    };
    this.setState({ user });
  };

  handleChange = e => {
    const user = this.state.user;
    const userFieldName = e.target.name;
    user[userFieldName] = e.target.value;
    this.setState({ user });
    console.log(userFieldName, user);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="userForm mb-5">
              <p className="userForm__title">Login</p>
              <Login
                {...this.state}
                onFormSubmit={this.handleFormSubmit}
                onInputFieldChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="userForm mb-5">
              <p className="userForm__title">Register</p>
              <Register
                {...this.state}
                onFormSubmit={this.handleFormSubmit}
                onInputFieldChange={this.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAuth;
