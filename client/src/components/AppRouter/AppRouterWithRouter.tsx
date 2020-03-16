import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import OperationDashboard from '../Dashboard/OperationDashboard';
import MealSchedule from '../MealSchedule/MealSchedule';
import UserForm from '../User/UserForm';
import MenuSchedule from '../Menu/Subscriber/MenuSchedule';
import MenuDetails from '../Menu/Subscriber/MenuDetails';
import HelpContact from '../Contact/HelpContact';
import GlobalErrorHandler from '../../components/ErrorHandler/GlobalErrorHandler';
import { connect } from 'react-redux';



import { AppState } from '../../type/Type';

import './AppRouter.css';
class AppRouterWithRouter extends Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props)
  }
  // componentDidUpdate(prevProps:any) {
  //   if (this.props.location.pathname  !== prevProps.location.pathname ) {
  //     console.log('Route changed')
  //   }
  // }
  render() {
    return (
     
          <div>
            <GlobalErrorHandler/> 
            <div>
              <Route
                path="/"
                exact
                component={this.props.auth ? Dashboard : Login}
              />
              <Route exact path="/help-contact/" component={HelpContact} />
              <Route exact path="/dashboard/" component={Dashboard} />
              <Route exact path="/meal-schedule/" component={MealSchedule} />
              <Route exact path="/menu-schedule/" component={MenuSchedule} />
              <Route
                exact
                path="/menu-schedule/details/:currentDate"
                component={MenuDetails}

              />
              <Route exact path="/profile/" component={UserForm} />
              <Route
                exact
                path="/operation/dashboard/"
                component={OperationDashboard}
              />
            </div>

            <Navigator />
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


export default connect(mapStateToProps) (withRouter(AppRouterWithRouter));
