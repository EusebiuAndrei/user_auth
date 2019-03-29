import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <form onSubmit={e => this.props.onFormSubmit(e, "login")}>
        <div className="form-group">
          <label htmlFor="user-name">Username</label>
          <input
            type="text"
            className="form-control"
            id="user-name"
            name="name"
            placeholder="How would you like to be called?"
            value={this.props.user.name}
            onChange={this.props.onInputFieldChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            className="form-control"
            id="user-password"
            name="password"
            placeholder="Password"
            value={this.props.user.password}
            onChange={this.props.onInputFieldChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    );
  }
}

export default Login;
