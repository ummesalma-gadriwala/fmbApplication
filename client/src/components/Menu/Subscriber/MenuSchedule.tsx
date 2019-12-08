import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../../requireAuth';
import Spinner from '../../Spinner/Spinner';

import { withStyles } from '@material-ui/core/styles';

import { Schedule, AppState, MenuItem, OverrideSchedule } from '../../../type/Type';
import * as scheduleAction from '../../../reducers/scheduleAction';
import * as mealscheduleAction from '../../../reducers/mealscheduleAction';
import { isMealCancellationEnabled } from '../menuSchedulingUtils'

import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider/Divider';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBeforeOutlined';
import BlockOutlined from '@material-ui/icons/BlockOutlined';
import RateReviewOutlined from '@material-ui/icons/RateReviewOutlined';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
import Paper from '@material-ui/core/Paper';

 

import './MenuSchedule.css';
import { OverflowYProperty } from 'csstype';
const dateFns = require('date-fns');

class MenuSchedule extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      weekStartDate:  dateFns.startOfWeek(new Date()),
      activeWeekRelativeToCurrentWeek: 0,
      isBusy: true
    };
  }

  componentDidMount() {
    this.props.getMonthsSchedule();
    this.props.getSubscriptionSchedule(this.props.subscriberId);
    this.setState({isBusy: false})
  }

  render() {
    const buildMenuItem = (
      menuItems: MenuItem[] | null,
      noMeal:boolean,
      noMealReason: string
    ) => {
      if(noMeal && noMealReason) {
        return <li > { `No Thali : ${noMealReason}`}</li>
      }
      return (
        menuItems &&
        menuItems.map((menuItem: MenuItem, index: number) => {
          return <li key={index}> { menuItem.itemName}</li>;
        })
      );
    };

    const isMealCancelledOnDate = ( date:string ) => {
      const overrideSchedules: OverrideSchedule[]  = this.props.mealSchedule.overrideSchedules
      return (overrideSchedules.find( schedule =>(dateFns.isWithinInterval(new Date(date), {start: new Date(schedule.overrideStartDate), end:  new Date(schedule.overrideEndDate) })))) 
          
    }
   
    const isReviewEnabled = (reviewDate:string) => {
      return !dateFns.isFuture(dateFns.parseISO(reviewDate)) &&
             !isMealCancelledOnDate(reviewDate)&&   
              dateFns.differenceInDays(
                    dateFns.parseISO(reviewDate),
                    dateFns.addDays(new Date() , -5) )
                      <=  5
    }

    const buildMenu = () => {
      return (
        this.props.schedule &&
        this.props.schedule.length > 0 &&
        this.props.schedule.map((day: Schedule, index: number) => {
          return (
            dateFns.isSameWeek(
              new Date(day.dailyDate),
              this.state.weekStartDate
            ) && (
              <div key={index} className="daily-menu-container">
                <Card className={this.props.classes.card}>
                  <CardActionArea
                      onClick={() =>
                        this.props.history.push(
                          `/menu-schedule/details/${day.dailyDate}`
                        )
                      }
                      disabled = { day.noMeal }
                    >
                    <CardHeader
                      title={
                        dateFns.format(
                        dateFns.parseISO(day.dailyDate),
                        'dd-MMM-yyyy',
                        { awareOfUnicodeTokens: true }
                      )  }
                      avatar = {  <CalendarTodayRoundedIcon fontSize= "small"/>}
                      className = { isMealCancelledOnDate (day.dailyDate) ? "MenuCard-Header-Meal-Cancelled" : "" }
                    />
                    <Divider />
                    <CardContent className={this.props.classes.cardcontent}>
                      <div className = "MenuSchedule-content-contianer">
                        <ul>
                          <Typography component="p">
                            {buildMenuItem(
                              day.menu && day.menu.items,
                              day.noMeal,
                              day.noMealReason
                            )}
                          </Typography>
                        </ul>
                        { !day.noMeal &&
                          <div className="MenuSchedule-action-contianer">
                          {/* { isReviewEnabled(day.dailyDate) && 
                            <div className="MenuSchedule-action-review-cancel">
                              <span><strong> Review</strong> </span>
                              <span> <RateReviewOutlined/></span>
                            </div> */}
                             
                          { !isMealCancelledOnDate(day.dailyDate ) && isMealCancellationEnabled(day.dailyDate) && 
                            !isReviewEnabled(day.dailyDate) && 
                            <div className="MenuSchedule-action-review-cancel">
                              <span><strong>Cancel</strong> </span>
                              <span><BlockOutlined/></span>
                            </div>
                          }
                          </div>
                        }
                      </div>  
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          );
        })
      );
    };

    const navigatePreviousWeek = () => {
      this.setState({
        weekStartDate: dateFns.addWeeks(this.state.weekStartDate, -1)
      });
    };

    const navigateNextWeek = () => {
      this.setState({
        weekStartDate: dateFns.addWeeks(this.state.weekStartDate, 1)
      });
    };

    return (
      <div>
       <Spinner active={this.state.isBusy}>
         <Paper className="menu-schedule-week-navigator-container">
  
          <Fab
            onClick={() => navigatePreviousWeek()}
            aria-label="Open Dashboard"
            className={this.props.classes.fab}
          >
            <NavigateBeforeIcon />
          </Fab>
          <div>
              <strong>
              {` Menu for Week of ${dateFns.format(
                this.state.weekStartDate,
                'dd MMM',
                { awareOfUnicodeTokens: true }
              )}`}{' '}
            </strong>
          </div>
          <Fab
            onClick={() => navigateNextWeek()}
            className={this.props.classes.fab}
            disabled = { dateFns.isSameWeek(new Date(),this.state.weekStartDate)  
                                        ? dateFns.isSameWeek(new Date(),this.state.weekStartDate) && (!dateFns.isFriday(new Date()) && !dateFns.isSaturday(new Date()) ) 
                                        :  dateFns.isSameWeek(new Date(),this.state.weekStartDate) }

          >
           <NavigateNextIcon />
          </Fab>
        </Paper>
        {buildMenu()}
       </Spinner> 
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return Object.assign({}, state, {
    subscriberId: state.authentication.decodedToken.subscriberId,
    schedule: state.schedules as Schedule[]
    
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
  media: {
    height: 0,
    //paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent : 'space-around'
  },
  cardcontent: {
    padding: 5,
    marginTop: 5
  }

});

export default requireAuth(
  connect(mapStateToProps, {...scheduleAction, ...mealscheduleAction})(withStyles(styles)(MenuSchedule))
);
