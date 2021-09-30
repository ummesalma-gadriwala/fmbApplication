import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeTwoToneIcon from '@material-ui/icons/HomeRounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import OperationIcon from '@material-ui/icons/CenterFocusStrongTwoTone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutlineTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BlockIcon from '@material-ui/icons/Block';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import './Navigator';

import { AppState } from '../../type/Type';

import {
  doesUserBelongsToOperation,
  doesUserBelongsToCRMOperation,
  isUserSubscriber
} from '../../util/authorization';
import { signout } from '../../reducers/authenticationAction';
import { workFlowRouteProcessor } from '../../util/workFlowProcessor';

const styles = (theme: any) => ({
  appBar: {
    top: 'auto',
    bottom: 0
  }
});

class Navigator extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.forceSWupdate = this.forceSWupdate.bind(this);
  }

  forceSWupdate() {
    window.location.reload(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (const registration of registrations) {
          registration.update();
        }
      });
    }
  }

  render() {
    const DashBoardLink = (props: any) => <Link to="/dashboard" {...props} />;
    const UserProfileLink = (props: any) => <Link to="/profile" {...props} />;

    const logOff = () => {
      this.props.signout((workFlowRoute: string) => {
        workFlowRouteProcessor(this.props.history, '/', workFlowRoute);
      }, null);
    };

    const OperationDashBoardLink = (props: any) => (
      <Link to="/operation/dashboard" {...props} />
    );

    const CRMDashBoardLink = (props: any) => (
      <Link to="/operation/crm-dashboard" {...props} />
    );

    return this.props.authenticated ? (
      <div>
        <AppBar
          position="fixed"
          color="primary"
          className={this.props.classes.appBar}
        >
          <Toolbar className="appbar-container">
            <IconButton
              component={DashBoardLink}
              color="inherit"
              aria-label="Open Dashboard"
            >
              <HomeTwoToneIcon />
            </IconButton>

            <IconButton
              component={UserProfileLink}
              color="inherit"
              aria-label="Open Dashboard"
            >
              <PersonOutlineIcon />
            </IconButton>
            {/* <IconButton color="inherit" aria-label="Show Notifications">
               
              <NotificationsIcon />
            </IconButton> */}
            <IconButton
              color="inherit"
              aria-label="Refresh To get Updates"
              onClick={() => this.forceSWupdate()}
              component={DashBoardLink}
            >
              <RefreshTwoToneIcon />
            </IconButton>
            {doesUserBelongsToOperation(this.props.roles) && (
              <div>
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
              </div>
            )}
            {doesUserBelongsToCRMOperation(this.props.roles) && (
              <div>
                <IconButton
                  component={CRMDashBoardLink}
                  color="inherit"
                  aria-label="Customer Relations"
                >
                  <AssignmentIcon
                    color="inherit"
                    aria-label="Customer Relations"
                  />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Logoff Button"
                  onClick={() => logOff()}
                >
                  <BlockIcon />
                </IconButton>
              </div>
            )}
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

export default withRouter(
  connect(mapStateToProps, { signout })(withStyles(styles)(Navigator))
);
