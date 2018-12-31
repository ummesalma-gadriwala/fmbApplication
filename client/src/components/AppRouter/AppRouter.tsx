import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import { connect } from "react-redux";

import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import "./AppRouter.css";
import UserProfile from "../User/ProfileInfo/ProfileInfo";
import UserForm from "../User/UserForm";
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
class AppRouter extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="App-container">
        <Router>
          <div>
            <div>
              <Route
                path="/"
                exact
                component={this.props.auth ? Dashboard : Login}
              />
              <Route path="/dashboard/" component={Dashboard} />
              <Route path="/profile/" component={UserForm} />
            </div>
            <Navigator />

            <Route path="/" exact component={UserForm} />
            <Route path="/dashboard/" component={Dashboard} />
            <Route path="/profile/" component={Login} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    auth: state.authentication.authenticated
      ? state.authentication.authenticated
      : undefined
  };
}

export default connect(mapStateToProps)(AppRouter);
