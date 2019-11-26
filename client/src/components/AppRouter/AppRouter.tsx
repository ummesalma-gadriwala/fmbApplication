import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import { connect } from "react-redux";

import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import OperationDashboard from "../Dashboard/OperationDashboard";
import MealSchedule from "../MealSchedule/MealSchedule";
import UserProfile from "../User/ProfileInfo/ProfileInfo";
import UserForm from "../User/UserForm";
import MenuSchedule from "../Menu/Subscriber/MenuSchedule";
import MenuDetails from "../Menu/Subscriber/MenuDetails"

import {AppState} from '../../type/Type';

import { doesUserBelongsToOperation, isUserSubscriber } from '../../util/authorization'

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
              <Route
                path="/"
                exact
                component={this.props.auth ? Dashboard : Login}
              />
              <Route exact path="/dashboard/" component={Dashboard} />
              <Route exact path="/meal-schedule/" component={MealSchedule} />
              <Route exact path="/menu-schedule/" component={MenuSchedule} />
              <Route exact path="/menu-schedule/details/:currentDate" component={MenuDetails} />
              <Route exact path="/profile/" component={UserForm} />
              <Route exact path="/operation/dashboard/" component={OperationDashboard} />
            </div>
            
            <Navigator />
            
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.authentication.authenticated
      ? state.authentication.authenticated
      : undefined,
    roles: state.authentication.decodedToken.roles
      ? state.authentication.decodedToken.roles
      : undefined 
  };
}

export default connect(mapStateToProps)(AppRouter);
