import React, { Component } from 'react';
import requireAuth from '../../requireAuth';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import RestaurantMenuRoundedIcon from '@material-ui/icons/RestaurantMenuRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import * as scheduleAction from '../../reducers/scheduleAction';
import Spinner from '../Spinner/Spinner';

import Divider from '@material-ui/core/Divider/Divider';
import {
  AppState,
  Schedule,
  Contributor,
  MenuItem,
  LabelValue,
  ContributionType_TIFFIN,
  ContributionType_FATEHA
} from '../../type/Type';

import { Link } from 'react-router-dom';

import './Dashboard.css';
const dateFns = require('date-fns');

interface DashBoardState {
  todaysSchedule: Schedule | null;
  formattedTodaysDate: string | null;
  tiffinContributor: Contributor | null;
  fatehaContributor: Contributor | null;
}

class Dashboard extends Component<any, DashBoardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todaysSchedule: null,
      formattedTodaysDate: null,
      tiffinContributor: null,   
      fatehaContributor: null  
    };
  }

  componentDidMount() {
   this.props.getMonthsSchedule();
    this.setState({
      formattedTodaysDate: dateFns.format(new Date(), 'dd-MMM-yyyy', {
        awareOfUnicodeTokens: true
      })
    });
  }

  componentDidUpdate(prevProps: any, prevState: DashBoardState) {
    if (
      this.props.schedule !== prevProps.schedule ||
      (this.state && this.state.todaysSchedule) !==
        (prevState && prevState.todaysSchedule) ||
      this.props.isBusyCommunicating !== prevProps.isBusyCommunicating  
    ) {
      this.setState({
        todaysSchedule: this.props.schedule,
        tiffinContributor:
          this.props.schedule &&
          this.props.schedule.contributors &&
          this.props.schedule.contributors.filter(
            contributor =>
              contributor.contributionType === ContributionType_TIFFIN
          )[0],
        fatehaContributor:
          this.props.schedule &&
          this.props.schedule.contributors &&
          this.props.schedule.contributors.filter(
            contributor =>
              contributor.contributionType === ContributionType_FATEHA
          )[0]
      });
    }
  }

  render() {
    const MealScheduleLink = (props: any) => (
      <Link to="/meal-schedule" {...props} />
    );
    const MenuScheduleLink = (props: any) => (
      <Link to="/menu-schedule" {...props} />
    );
    const buildMenuItem = (
      menuItems: MenuItem[] | null,
      noMealReason: string
    ) => {
      return (
        menuItems &&
        menuItems.map((menuItem: MenuItem, index: number) => {
          return (
            <span className="Dashboard-menu-items-each" key={index}>
              {' '}
              &#x2726; {menuItem.itemName}
            </span>
          );
        })
      );
    };
    const buildMessages = (messages: LabelValue[] | null) => {
      return (
        messages &&
        messages.map((message: LabelValue, index: number) => {
          return (
            <React.Fragment>
              <span className="Dashboard-instructionForSubscriber-label">
                <strong> {message && message.messageLabel}</strong>
              </span>
              <Divider />
              <span className="Dashboard-instructionForSubscriber-value">
                {' '}
                {message && message.messageValue}
              </span>
            </React.Fragment>
          );
        })
      );
    };
    return (
      <div>
        <Spinner active={this.props.isBusyCommunicating}>
          {this.state && (
            <React.Fragment>
              <div className="Dashboard-container">
                <div className="Dashboard-card-container">
                  <Card className="Card-container">
                    <CardContent>
                      <div className="Dashboard-date-display-container">
                        <CalendarTodayRoundedIcon fontSize="small" />
                        <span className="Dashboard-date-display">
                          <strong>
                            {dateFns.format(new Date(), 'dd-MMM-yyyy', {
                              awareOfUnicodeTokens: true
                            })}
                          </strong>
                        </span>
                      </div>
                      {!this.state.todaysSchedule  && (
                        <React.Fragment>
                          <Typography variant="h5">
                            <span className="Dashboard-no-details">
                              No Thali Today{' '}
                            </span>
                          </Typography>
                        </React.Fragment>
                      )}
                      {this.state.todaysSchedule && (
                        <React.Fragment>
                          {this.state.todaysSchedule.noMeal && (
                            <div className="Dashboard-nomeal-contianer">
                              <Typography component="p">
                                <strong>
                                  {' '}
                                  No Thali :{' '}
                                  {this.state.todaysSchedule.noMealReason}{' '}
                                </strong>
                              </Typography>
                            </div>
                          )}
                          {this.state.tiffinContributor && (
                            <div className="Dashboard-contributor-contianer">
                              <Typography component="div">
                                Aaj ni thaali ni khidmat
                              </Typography>
                              <Typography component="div">
                                <span>
                                  <strong>
                                    {`${this.state.tiffinContributor &&
                                      this.state.tiffinContributor.user &&
                                      this.state.tiffinContributor.user
                                        .firstName}     
                                      ${this.state.tiffinContributor &&
                                        this.state.tiffinContributor.user &&
                                        this.state.tiffinContributor.user
                                          .lastName}  
                                      & family`}
                                  </strong>
                                </span>
                              </Typography>
                            </div>
                          )}
                          {this.state.todaysSchedule && this.state.todaysSchedule.menu &&
                            this.state.todaysSchedule.menu.items.length > 0 && (
                              <React.Fragment>
                                <div className="Dashboard-menu-container">
                                  <div className="Dashboard-menu-primary-container Dashboard-menu-container_items">
                                    <Typography>
                                      <strong>Menu</strong>
                                    </Typography>
                                    <Typography component="div">
                                      <div className="Dashboard-menu-items">
                                        {buildMenuItem(
                                          this.state.todaysSchedule.menu &&
                                            this.state.todaysSchedule.menu.items,
                                          this.state.todaysSchedule.noMealReason
                                        )}
                                      </div>
                                    </Typography>
                                  </div>
                                  {this.state.fatehaContributor &&
                                    this.state.fatehaContributor
                                      .messageFromContributor && (
                                      <div className="Dashboard-menu-side-note Dashboard-menu-container_items">
                                        <div className="Dashboard-menu-side-note_content-left">
                                          <span>
                                            <strong>Sagla Mumineen ne Aqa Maula Syedna Aaliqdar Mufaddal Saifuddin TUS taraf si Faiz ul Mawaid Burhaniyah ni thali nu niyaz Mubarak aney Mohanna Karjo</strong>
                                          </span>  
                                        </div>
                                        <div className="Dashboard-menu-side-note_content-left">
                                          <span>
                                            <strong>Salwaat</strong>
                                            <ul>
                                              <li>Panjatan Pak (AS)</li>
                                              <li>Syedna Hatim Bin Ibrahim (RA)</li>
                                              <li>Syedna Taher Saifuddin (RA)</li>
                                              <li>Syedna Mohammed Burhanuddin (RA)</li>
                                            </ul>  
                                          </span>  
                                        </div>
                                      </div>
                                    )}
                                  
                                  
                                  {this.state.fatehaContributor &&
                                    this.state.fatehaContributor
                                      .messageFromContributor && (
                                      <div className="Dashboard-menu-side-note Dashboard-menu-container_items">
                                        <div className="Dashboard-menu-side-note_header">
                                          <strong>
                                            {
                                              this.state.fatehaContributor.messageFromContributor.filter(
                                                messageLabel => messageLabel && 
                                                  messageLabel.messageLabel.toLowerCase() ===
                                                  ContributionType_FATEHA.toLowerCase()
                                              )[0].messageLabel
                                            }
                                          </strong>
                                        </div>
                                        <div className="Dashboard-menu-side-note_content">
                                          {
                                            this.state.fatehaContributor.messageFromContributor.filter(
                                              messageLabel => messageLabel &&
                                                messageLabel.messageLabel.toLowerCase() ===
                                                ContributionType_FATEHA.toLowerCase()
                                            )[0].messageValue
                                          }
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </React.Fragment>
                            )}
                          {this.state.todaysSchedule && this.state.todaysSchedule.instructionsForSubscriber && this.state.todaysSchedule.instructionsForSubscriber.length>0  && this.state.todaysSchedule.instructionsForSubscriber[0].messageValue.length>0  && (
                            <React.Fragment>
                              <h6>Announcements</h6>
                              <div className="Dashboard-instructionForSubscriber-container">
                                {buildMessages(
                                  this.state.todaysSchedule
                                    .instructionsForSubscriber
                                )}
                              </div>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </CardContent>
                    {/* <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                  </Card>
                </div>
                {/*<div className="Dashboard-card-container">
                  <Card className="Card-container">
                    <CardContent>
                      <Typography color="textSecondary">
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
                     <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> 
                  </Card>
                </div>*/}
                <div className="Dashboard-button-row-container">
                  <div className="Dashboard-button-row">
                    <div className="Dashboard-button-container">
                      <Button
                        component={MenuScheduleLink}
                        variant="contained"
                        color="secondary"
                        className="Dashboard-button"
                      >
                        <span className="Dashboard-button-content-container">
                          Menu
                          <RestaurantMenuRoundedIcon />
                        </span>
                      </Button>
                    </div>
                    <div className="Dashboard-button-container">
                      <Button
                        component={MealScheduleLink}
                        variant="contained"
                        color="secondary"
                        className="Dashboard-button"
                      >
                        <span className="Dashboard-button-content-container">
                          <p>Going on Vacation</p>
                          <CreateRoundedIcon />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </React.Fragment>
          )}
        </Spinner>  
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return  {
    schedule: state.schedules.find(
      schedule =>
        schedule.dailyDate ===
        dateFns.format(new Date(), 'yyyy-MM-dd', { awareOfUnicodeTokens: true })
    ) as Schedule,
    isBusyCommunicating: state.isBusyCommunicating
  };
};

export default requireAuth(connect(mapStateToProps, scheduleAction)(Dashboard));
