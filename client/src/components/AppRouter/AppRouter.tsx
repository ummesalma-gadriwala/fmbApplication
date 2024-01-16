import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigator from '../Navigator/Navigator';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import OperationDashboard from '../Dashboard/OperationDashboard';
import CRMDashboard from '../Dashboard/CRMDashboard';
import MealSchedule from '../MealSchedule/MealSchedule';
import UserForm from '../User/UserForm';
import MenuSchedule from '../Menu/Subscriber/MenuSchedule';
import MenuDetails from '../Menu/Subscriber/MenuDetails';
import DailyMealCountReport from '../Operations/Reports/DailyMealCountReport';
import DailyMealCountReportV2 from '../Operations/Reports/DailyMealCountReport_V2';

import HelpContact from '../Contact/HelpContact';

import GlobalErrorHandler from '../../components/ErrorHandler/GlobalErrorHandler';

import { AppState } from '../../type/Type';

import './AppRouter.css';
import ReviewDetails from '../Menu/Subscriber/ReviewDetails';
import AddTiffin from '../Operations/CRM/AddTiffin';
import PrintLabelsSectorWise from '../Operations/Labels/PrintLabelsSectorWise';
class AppRouter extends Component<any, any> {
  render() {
    return (
      <div className="App-container">
        <Router>
          <div>
            <Header />
            <GlobalErrorHandler />
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
              <Route
                exact
                path="/menu-schedule/review/:currentDate"
                component={ReviewDetails}
              />
              <Route exact path="/profile/" component={UserForm} />
              <Route
                exact
                path="/operation/dashboard/"
                component={OperationDashboard}
              />
              <Route
                exact
                path="/operation/crm-dashboard/"
                component={CRMDashboard}
              />
              <Route
                exact
                path="/operation/crm/add-tiffin"
                component={AddTiffin}
              />
              <Route
                exact
                path="/operation/meal-count-report/"
                component={DailyMealCountReport}
              />
              <Route
                exact
                path="/operation/meal-count-report/v2/"
                component={DailyMealCountReportV2}
              />
              <Route
                exact
                path="/operation/label-print/"
                component={PrintLabelsSectorWise}
              />
              <Route exact path="/logout" component={Login} />
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
