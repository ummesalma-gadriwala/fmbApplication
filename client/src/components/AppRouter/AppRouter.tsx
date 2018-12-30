import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import { connect } from "react-redux";

import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import UserProfile from "../UserProfile/UserProfile";
import  './AppRouter.css';

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
              <Route path="/" exact component={ this.props.auth ? Dashboard : Login} />
              <Route path="/dashboard/" component={Dashboard} />
              <Route path="/profile/" component={UserProfile} />
            </div>
            <Navigator />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { auth: state.authentication.authenticated ? state.authentication.authenticated : undefined };
}

export default connect(mapStateToProps)(AppRouter);
