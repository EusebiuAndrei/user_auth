import React, { Component } from "react";

function FormGroup(userField, inputType, inputDescription, ariaDesc = null) {
  this.userField = userField;
  this.inputType = inputType;
  this.inputDescription = inputDescription;
  this.inputDesc = ariaDesc;
}

function firstLetterHigh(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

class Register extends Component {
  render() {
    const formGroups = [
      new FormGroup("fullName", "text", "What's your name?"),
      new FormGroup("age", "text", "How old are you?"),
      new FormGroup("name", "text", "How would you like to be called?"),
      new FormGroup("email", "email", "Enter email", "emailHelp"),
      new FormGroup("password", "password", "Password")
    ];
    return (
      <form onSubmit={e => this.props.onFormSubmit(e, "register")}>
        {formGroups.map((item, index) => (
          <div key={index} className="form-group">
            <label htmlFor="user-fullName">
              {firstLetterHigh(item.userField)}
            </label>
            <input
              type={item.inputType}
              className="form-control"
              id={`user-${item.userField}`}
              placeholder={item.inputDescription}
              name={item.userField}
              value={this.props.user[item.userField]}
              onChange={this.props.onInputFieldChange}
              aria-describedby={item.ariaDesc}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    );
  }
}

export default Register;
