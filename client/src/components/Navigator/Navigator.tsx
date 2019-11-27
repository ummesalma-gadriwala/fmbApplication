import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OperationIcon from '@material-ui/icons/CenterFocusStrongTwoTone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutlineTwoTone';
import { withStyles } from '@material-ui/core/styles';
import './Navigator';

import { AppState } from '../../type/Type';

import {
  doesUserBelongsToOperation,
  isUserSubscriber
} from '../../util/authorization';

const styles = (theme: any) => ({
  appBar: {
    top: 'auto',
    bottom: 0
  }
});

class Navigator extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const DashBoardLink = (props: any) => <Link to="/dashboard" {...props} />;
    const UserProfileLink = (props: any) => <Link to="/profile" {...props} />;

    const OperationDashBoardLink = (props: any) => (
      <Link to="/operation/dashboard" {...props} />
    );

    return this.props.authenticated ? (
      <div>
        <AppBar
          position="fixed"
          color="primary"
          className={this.props.classes.appBar}
        >
          <Toolbar>
            <IconButton
              component={DashBoardLink}
              color="inherit"
              aria-label="Open Dashboard"
            >
              <DashboardIcon />
            </IconButton>
            {doesUserBelongsToOperation(this.props.roles) && (
              <IconButton
                component={OperationDashBoardLink}
                color="inherit"
                aria-label="Show Notifications"
              >
                <OperationIcon
                  color="inherit"
                  aria-label="Open Operation Dashboard"
                />
              </IconButton>
            )}
            <IconButton
              component={UserProfileLink}
              color="inherit"
              aria-label="Open Dashboard"
            >
              <PersonOutlineIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Show Notifications">
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    ) : null;
  }
}

function mapStateToProps(state: AppState) {
  return {
    authenticated: state.authentication.authenticated,
    roles: state.authentication.decodedToken.roles
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Navigator));
