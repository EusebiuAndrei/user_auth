import React, { Component } from "react";
import {observer} from 'mobx-react';
import {withMolecule} from 'react-molecule';

@observer(["store"]) 
class App extends Component {
  render() {
    console.log(this.props.store.user);
    const { username, _id } = this.props.store.user;
    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="mb-4">User Profile</h2>
              <p className="text-secondary">username: {username !== undefined && username}</p>
              <p className="text-secondary">id: {_id !== undefined && _id}</p>
            </div>
          </div>
        </div>
    );
  }
}

export default withMolecule(App);