import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {observable} from 'mobx';
import {observer, Provider} from 'mobx-react';
import { Switch, Route } from 'react-router-dom'
//components
import Header from './Header'
import Register from "./Register";
import Profile from "./Profile";
import Login from "./Login";

const store = observable({
  user: {}
});

store.updateUser = function(newUser) {
  this.user = newUser;
}

const QUERY = gql`
  query {
    sayHello
  }
`;

@observer class App extends Component {
  render() {
    const {username} = store.user;
    return (
      <Provider store={store}>
        <div className="center w85">
          <Header />
          <div className="ph3 pv1 background-gray">
            <Switch>
              <Route exact path="/" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
