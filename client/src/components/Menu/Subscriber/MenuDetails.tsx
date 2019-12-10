import 'date-fns';
import React, { PureComponent, useState } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../../requireAuth';
import { withStyles } from '@material-ui/core/styles';
import {
  Schedule,
  AppState,
  MenuItem as FoodMenuItems,
  OverrideSchedule,
  LabelValue,
  SubscriptionSchedule
 } from '../../../type/Type';
import * as scheduleAction from '../../../reducers/scheduleAction';
import * as mealscheduleAction from '../../../reducers/mealscheduleAction';
import Divider from '@material-ui/core/Divider/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl    from '@material-ui/core/FormControl';
import Button    from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './MenuDetails.css';
import { WEEKDAYS } from '../../../util/constant';
import Spinner from '../../Spinner/Spinner';
import { isMealCancellationEnabled } from '../menuSchedulingUtils'



const dateFns = require('date-fns');

interface MenuDetailsState {
  numberOfOptedMealForSelectedDay : Number;
  cancelOrReduceMealSchedule: OverrideSchedule;
  hasScheduleChangedAlready: boolean;
  isBusy: boolean;
  currentDate: any;
}

class MenuDetails extends PureComponent<any, MenuDetailsState|any> {
  
  constructor(props: any) {
    super(props);
    const {
      match: { params }
    } = this.props;

    this.handleOnQunatityChange = this.handleOnQunatityChange.bind(this)
    this.isScheduleChanged = this.isScheduleChanged.bind(this)
    this.getMealCountForDay = this.getMealCountForDay.bind(this)
    this.state = {currentDate: dateFns.parseISO(params.currentDate)};

  }

  isScheduleChanged = (optedScheduleCount:Number, updatedCount:Number ) => {
    return optedScheduleCount !== updatedCount;
  }
  
  getMealCountForDay = (schedule: Schedule|OverrideSchedule, selectedDayDate: any ) => {
    return schedule[WEEKDAYS[ dateFns.getDay(this.state.currentDate)]]
  }

  handleOnQunatityChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    this.setState({ numberOfOptedMealForSelectedDay: value})
    let updatedSchedule : OverrideSchedule = {... this.state.cancelOrReduceMealSchedule };
    updatedSchedule.weeklyOverrideSchedule[WEEKDAYS[ dateFns.getDay(this.state.currentDate)]]=parseInt(value); 
    this.setState( { cancelOrReduceMealSchedule: updatedSchedule })
  }

  initiateState() {
    if (this.props.mealSchedule) {
      const overrideSchedule = this.props.mealSchedule.overrideSchedules.filter(schedule => {
        return (dateFns.isWithinInterval(this.state.currentDate, {
          start: new Date(schedule.overrideStartDate.split("-")[0], (schedule.overrideStartDate.split("-")[1] - 1), schedule.overrideStartDate.split("-")[2]),
          end: new Date(schedule.overrideEndDate.split("-")[0], (schedule.overrideEndDate.split("-")[1] - 1), schedule.overrideEndDate.split("-")[2])
        }));
      })[0];
      this.setState({
      cancelOrReduceMealSchedule: {
        overrideStartDate: dateFns.parseISO(dateFns.format(this.state.currentDate, 'yyyy-MM-dd', { awareOfUnicodeTokens: true })),
        overrideEndDate: dateFns.parseISO(dateFns.format(this.state.currentDate, 'yyyy-MM-dd', { awareOfUnicodeTokens: true })),
        weeklyOverrideSchedule: { ...overrideSchedule ? overrideSchedule.weeklyOverrideSchedule : this.props.mealSchedule.optedSchedule }
      },
        numberOfOptedMealForSelectedDay: overrideSchedule ? this.getMealCountForDay(overrideSchedule.weeklyOverrideSchedule, this.state.currentDate)
          : this.getMealCountForDay(this.props.mealSchedule.optedSchedule, this.state.currentDate),
        hasScheduleChangedAlready: overrideSchedule ? true : false
      });
    }
  }

  componentDidMount() {
    if (this.props.mealSchedule.optedSchedule.MONDAY === null ) {
      this.props.getSubscriptionSchedule(this.props.subscriberId)
    }
    if( this.props.schedules && this.props.schedules.length === 0){
      this.props.getMonthsSchedule()
    }
    this.initiateState();
  }

  componentDidUpdate(prevProps: any, prevState: MenuDetailsState) {
    if (this.props.schedule !== prevProps.schedule || 
        this.props.mealSchedule !== prevProps.mealSchedule 
       ) {
       this.initiateState();
    }
  }

  render() {
    const updateMealPlanAndNavigate = () => {
      const optedMealCount:Number = this.getMealCountForDay(this.props.mealSchedule.optedSchedule, this.state.currentDate)
      const updatedMealCount:Number = this.state.cancelOrReduceMealSchedule && this.getMealCountForDay(this.state.cancelOrReduceMealSchedule.weeklyOverrideSchedule, this.state.currentDate) 
      this.setState({ isBusy: true })
      this.state.hasScheduleChangedAlready &&
      this.props.deleteOverrideSchedule(
        this.props.subscriberId,
        dateFns.format(this.state.currentDate, 'yyyy-MM-dd', { awareOfUnicodeTokens: true })
      )
      if (this.isScheduleChanged(optedMealCount,updatedMealCount)) {
        return (this.props.addOverrideSchedule(
          this.props.subscriberId,
          this.state.cancelOrReduceMealSchedule,
          this.props.history.goBack,
          () => { 
            this.setState({ isBusy: false });
          }
        ));
      }  
      this.props.history.goBack();
    }

    const buildQuantitySelector = ( optedQuantity:number ) => {
      let menuItems : any[] = [];
        if(!optedQuantity){
          return;
        }
        for (var i = optedQuantity;  i >= 0; i--) {
          this.state.numberOfOptedMealForSelectedDay === i
          ? menuItems.push(<FormControlLabel
                              value={ i.toString()}
                              control={<Radio color="secondary" checked={this.state.numberOfOptedMealForSelectedDay === i}  />}
                              label={ i === 0 ? `I want to cancel thali on ${dateFns.format(this.state.currentDate, 'dd-MMM-yyyy', { awareOfUnicodeTokens: true })}` : `I want ${ i } Thali on ${dateFns.format(this.state.currentDate, 'dd-MMM-yyyy', { awareOfUnicodeTokens: true })}`}
                              key = {i}
                              className = "MenuDetails-quantity-selector-radio-label"
                            />)
          : menuItems.push(<FormControlLabel
                              value={ i.toString()}
                              control={<Radio color="secondary"  />}
                              label={i === 0 ? `I want to cancel thali on ${dateFns.format(this.state.currentDate, 'dd-MMM-yyyy', { awareOfUnicodeTokens: true })}` : `I want ${ i } Thali on ${dateFns.format(this.state.currentDate, 'dd-MMM-yyyy', { awareOfUnicodeTokens: true })}`}
                              key = {i}
                              className = "MenuDetails-quantity-selector-radio-label"
                            />)
        }
      return menuItems;       
    }
 
    const buildMenuItem = (
      menuItems: FoodMenuItems[] | null,
      ) => {
      return (
        menuItems &&
        menuItems.map((menuItem: FoodMenuItems, index: number) => {
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
                <strong> {message.messageLabel}</strong>
              </span>
              <Divider />
              <span className="Dashboard-instructionForSubscriber-value">
                {' '}
                {message.messageValue}
              </span>
            </React.Fragment>
          );
        })
      );
    };

    return (
      <div>
        <Paper className="MenuDetails-header">
          <strong>
            {` Menu For ${ dateFns.format(this.state.currentDate, 'dd-MMM-yyy', {
              awareOfUnicodeTokens: true
            })}`}{' '}
          </strong>
        </Paper>
        <React.Fragment>
          <div className="MenuDetails-container">
            <div className="MenuDetails-card-container">
              <Spinner active={this.state.isBusy}>
                <Card className="Card-container">
                  <CardContent>
                    {this.props.selectedDateSchedule &&
                    this.props.selectedDateSchedule.menu &&
                      this.props.selectedDateSchedule.menu.items.length > 0 && (
                        <React.Fragment>
                          <div className="Dashboard-menu-container">
                            <div className="Dashboard-menu-primary-container Dashboard-menu-container_items">
                              <Typography>
                                <strong>Menu</strong>
                              </Typography>
                              <Typography component="div">
                                <div className="Dashboard-menu-items">
                                  {buildMenuItem(
                                    this.props.selectedDateSchedule.menu &&
                                      this.props.selectedDateSchedule.menu.items
                                  )}
                                </div>
                              </Typography>
                            </div>
                          </div>
                          {isMealCancellationEnabled(dateFns.format(this.state.currentDate, 'yyyy-MM-dd', {
                              awareOfUnicodeTokens: true
                            })) &&  
                            <React.Fragment>
                              <div className = "MenuDetails-quantity-selector-container">
                                <RadioGroup aria-label="position" name="position" value={this.state.numberOfOptedMealForSelectedDay && this.state.numberOfOptedMealForSelectedDay.toString()} onChange={this.handleOnQunatityChange}>
                                    {buildQuantitySelector(this.props.mealSchedule.optedSchedule[WEEKDAYS[ dateFns.getDay(this.state.currentDate)]])}
                                </RadioGroup>
                              </div>   
                            </React.Fragment>
                          }
                        <React.Fragment>
                        <div className = "MenuDetails-quantity-action-container">
                          <FormControl margin="dense" >
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={()=> updateMealPlanAndNavigate()}
                              >
                                { isMealCancellationEnabled(dateFns.format(this.state.currentDate, 'yyyy-MM-dd', {awareOfUnicodeTokens: true})
                                                           ) ?"Save" : "Back" }
                              </Button>
                            </FormControl>
                            </div>  
                        </React.Fragment> 
                      </React.Fragment>
                    )}
                  </CardContent>
                </Card>
              </Spinner>
            </div>
            </div>
         </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps:any) => {
  return Object.assign({}, state, {
    selectedDateSchedule: state.schedules.find(
                schedule =>
                  schedule.dailyDate === (ownProps && ownProps.match.params.currentDate)
              ) as Schedule,
    subscriberId: state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule as SubscriptionSchedule
  });
};
const styles = (theme: any) => ({
  fab: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
    height: 35,
    width: 35
  },
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  cardcontent: {
    padding: 5,
    marginTop: 5
  }

});

export default requireAuth(connect(mapStateToProps, { ...scheduleAction, ...mealscheduleAction })(withStyles(styles)(MenuDetails)));
