import React, { Component } from 'react';
import  requireAuth from '../../requireAuth';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import classNames from 'classnames';
import { Link } from "react-router-dom";


import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import './Dashboard.css'




class Dashboard extends Component<any, any> {

  
  constructor(props:any){
    super(props);
  }

  render () {
    const MealScheduleLink = (props:any) => <Link to="/meal-schedule" {...props} />
    return (
      <div>
        <div className="Dashboard-container">
        <div className="Dashboard-card-container">
            <Card className= "Card-container">
              <CardContent>
                <CalendarTodayRoundedIcon fontSize= "large"/>
                <Typography variant="h5" component="h2">
                   By   
                </Typography>
                <Typography component="p">
                  Hussain and Rasheeda Khambaati Famliy
                  <br />
                </Typography>
                <Typography variant="h6">
                   Menu   
                </Typography>
                <Typography component="ul">
                  
                    <li>Home Made Roti</li>
                    <li>Jeera Rice</li>
                    <li>Gosht Tarkaari</li>
                   
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card> 
          </div>
          <div className="Dashboard-card-container">
            <Card className= "Card-container">
              <CardContent>
                <Typography  color="textSecondary">
                  Sector : Jamali
                </Typography>
                <Typography  color="textSecondary">
                  Thali Pick up Address
                </Typography>
                <Typography component="p">
                  155 Argentia Rd, Mississauga, L1L2L3
                  <br />
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card> 
          </div>
          <div className="Dashboard-button-row-container">
            <div className="Dashboard-button-row">
              <div className="Dashboard-button-container">
                <Button variant="contained" color="secondary" className="Dashboard-button" >
                  <span className="Dashboard-button-content-container">  
                    Menu
                    <RestaurantMenuRoundedIcon />
                  </span>    
                </Button>
              </div>
              <div className="Dashboard-button-container">
                <Button component={MealScheduleLink} variant="contained" color="secondary" className="Dashboard-button">
                <span className="Dashboard-button-content-container">   
                      Going on Vacation
                  <CreateRoundedIcon/>
                </span>  
                </Button>
              </div> 
            </div>  
            <div className="Dashboard-button-row">  
              <div className="Dashboard-button-container">
              <Button  variant="contained" color="secondary" className="Dashboard-button" >
                <span className="Dashboard-button-content-container">  
                  Request Salwaat/Fateha
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
      <div>
      {/*  */}
    </div>
    </div> 
    )
  }
}

export default requireAuth(Dashboard)