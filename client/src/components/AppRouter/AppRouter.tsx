import React, { Component } from "react";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import { connect } from 'react-redux'; 

import  Login from  '../Login/Login';
import  Dashboard from '../Dashboard/Dashboard';

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class AppRouter extends Component<any, any> {

  constructor(props:any) {
     super(props);    
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigator/>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard/" component={Dashboard} />
          </div>
        </Router>
      </div>
    )
  }
}
  


function mapStateToProps(state:any) {
  return { auth: state.auth ? state.auth.authenticated : undefined };
}

export default connect(mapStateToProps)(AppRouter);


