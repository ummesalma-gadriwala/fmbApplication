import React, { Component } from 'react';
import requireAuth from '../../requireAuth';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DeleteIcon from '@material-ui/icons/Delete';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class OperationDashboard extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const ThaliCountReportLink = (props: any) => (
      <Link to="/operation/tahli-count-report" {...props} />
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
              <div className="Dashboard-button-container">
                <Button
                  variant="contained"
                  color="primary"
                  className="Dashboard-button"
                >
                  <span className="Dashboard-button-content-container">
                    Menu Scheduling
                    <RestaurantMenuRoundedIcon />
                  </span>
                </Button>
              </div>
              <div className="Dashboard-button-container">
                <Button
                  component={ThaliCountReportLink}
                  variant="contained"
                  color="secondary"
                  className="Dashboard-button"
                >
                  <span className="Dashboard-button-content-container">
                    <p>Thali Count Report</p>
                    <CreateRoundedIcon />
                  </span>
                </Button>
              </div>
            </div>
            <div className="Dashboard-button-row">
              <div className="Dashboard-button-container">
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
              </div>
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

export default requireAuth(OperationDashboard);
