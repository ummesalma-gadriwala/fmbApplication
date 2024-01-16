import React, { Component } from 'react';
import requireAuth from '../../requireAuth';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import PrintRoundedIcon from '@material-ui/icons/PrintRounded';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { doesUserBelongsToPrintLabelOperation } from '../../util/authorization';
import { connect } from 'react-redux';
import { AppState } from '../../type/Type';

class OperationDashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const ThaliCountReportLink = (props: any) => (
      <Link to="/operation/meal-count-report" {...props} />
    );
    const ThaliCountReportLinkV2 = (props: any) => (
      <Link to="/operation/meal-count-report/v2/" {...props} />
    );
    const PrintLabelsSectorWise = (props: any) => (
      <Link to="/operation/label-print/" {...props} />
    );
    return (
      <div>
        <div className="Dashboard-container">
          <div className="Dashboard-card-container">
            <Card className="Card-container">
              <CardContent>
                <CalendarTodayRoundedIcon fontSize="large" />
                <h6>Operation Dashboard </h6>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </div>
          <div className="Dashboard-button-row-container">
            <div className="Dashboard-button-row">
             { doesUserBelongsToPrintLabelOperation(this.props.roles) &&
              <div className="Dashboard-button-container">
                <Button
                  component={PrintLabelsSectorWise}
                  variant="contained"
                  color="secondary"
                  className="Dashboard-button"
                >
                  <span className="Dashboard-button-content-container">
                    Sector Label Printing
                    <PrintRoundedIcon />
                  </span>
                </Button>
              </div>
              }
              <div className="Dashboard-button-container">
                <Button
                  component={ThaliCountReportLinkV2}
                  variant="contained"
                  color="secondary"
                  className="Dashboard-button"
                >
                  <span className="Dashboard-button-content-container">
                    <p>Thali Count Report</p>
                    <TableChartTwoToneIcon />
                  </span>
                </Button>
              </div>
            </div>
            <div className="Dashboard-button-row">
              {/* <div className="Dashboard-button-container">
                <Button
                  variant="contained"
                  color="secondary"
                  className="Dashboard-button"
                >
                  <span className="Dashboard-button-content-container">
                    Approve New Registration
                    <AddCircleOutlineIcon />
                  </span>
                </Button>
              </div> */}
              {/* <div className="Dashboard-button-container">
              <Button variant="contained" color="secondary" className="Dashboard-button" >
                <span className="Dashboard-button-content-container">  
                  Update Profile
                  <DeleteIcon />
                </span>  
                </Button>
                
              </div>      */}
            </div>
          </div>
        </div>
        <div>{/*  */}</div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    authenticated: state.authentication.authenticated,
    roles: state.authentication.decodedToken.roles
  };
}

export default requireAuth(connect(mapStateToProps)(OperationDashboard));
