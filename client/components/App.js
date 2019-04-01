import React, { Component } from "react";
import {observable} from 'mobx';
import {observer, Provider} from 'mobx-react';
import { Switch, Route } from 'react-router-dom'
import { mole, Agent } from 'react-molecule';
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

class UserAgent extends Agent {
  store = observable({
    user: {}
  });

  updateUser = (newUser) => {
    this.store.user = newUser;
    console.log("agent store", this.store.user);
  }
}

const App = mole(() => {
  return {
    agents: {
      user: UserAgent.factory()
    }
  }
})(({ molecule }) => {
  return (
    <Provider store={store}>
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" render={() => <Profile molecule={molecule}/>} />
            <Route exact path="/login" render={() => <Login molecule={molecule}/>} />
            <Route exact path="/register" render={() => <Register molecule={molecule}/>} />
          </Switch>
        </div>
      </div>
    </Provider>
  );
});

export default observer(App);
