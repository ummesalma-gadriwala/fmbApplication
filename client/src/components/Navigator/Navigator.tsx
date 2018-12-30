import  React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import './Navigator';

import authentication from '../../reducers/authentication';

const styles = ( theme:any) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  }
});
 

class Navigator extends Component<any, any> {
  
  constructor(props:any) {
    super(props);

  }

  render() {
    const DashBoardLink = (props:any) => <Link to="/dashboard" {...props} />

    return (
      this.props.authenticated ?
          <div>
            <AppBar position="fixed" color="primary" className= { this.props.classes.appBar } >
              <Toolbar >
                <IconButton component={DashBoardLink} color="inherit" aria-label="Open Dashboard">
                  
                  <DashboardIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="Show Notifications">
                  <NotificationsIcon />
               </IconButton>
              </Toolbar>
            </AppBar>
          </div>
       : null
     
    );
  }
}

function mapStateToProps(state: any) {
  return { authenticated:   state.authentication.authenticated };
}

export default connect(mapStateToProps) (withStyles(styles)  (Navigator));

