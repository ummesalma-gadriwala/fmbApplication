import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../../requireAuth';
import { withStyles } from '@material-ui/core/styles';

import {
  Schedule,
  AppState,
  MenuItem,
  OverrideSchedule
} from '../../../type/Type';
import * as scheduleAction from '../../../reducers/scheduleAction';
import * as mealscheduleAction from '../../../reducers/mealscheduleAction';

import Divider from '@material-ui/core/Divider/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import './MenuSchedule.css';

const dateFns = require('date-fns');

class MenuDetails extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    const {
      match: { params }
    } = this.props;

    this.state = {
      weekStartDate: dateFns.startOfWeek(new Date()),
      activeWeekRelativeToCurrentWeek: 0,
      currentDate: dateFns.parseISO(params.currentDate)
    };

    //isSameWeek
    //startOfWeek
  }

  componentDidMount() {
    //this.setState({isBusy : true});
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.schedule);
    if (this.props.schedule && this.props.schedule.length == 0) {
      this.props.getMonthsSchedule();
    }
    this.props.getSubscriptionSchedule(this.props.subscriberId);
  }

  render() {
    const buildMenuItem = (
      menuItems: MenuItem[] | null,
      noMealReason: string
    ) => {
      return (
        menuItems &&
        menuItems.map((menuItem: MenuItem, index: number) => {
          return <li key={index}> {menuItem.itemName}</li>;
        })
      );
    };

    const buildMenu = () => {
      return (
        this.props.schedule &&
        this.props.schedule.length > 0 &&
        this.props.schedule.map((day: Schedule, index: number) => {
          return (
            day.dailyDate === this.state.currentDate && (
              <div key={index} className="daily-menu-container">
                <Card className={this.props.classes.card}>
                  <CardActionArea
                    onClick={() => console.log('Menu Card Touched')}
                  >
                    <Divider />
                    <CardContent className={this.props.classes.cardcontent}>
                      <ul>
                        <Typography component="p">
                          {buildMenuItem(
                            day.menu && day.menu.items,
                            day.noMealReason
                          )}
                        </Typography>
                      </ul>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          );
        })
      );
    };

    const buildMealSchedule = () => {
      return (
        this.props.mealSchedule &&
        this.props.mealSchedule.overrideSchedules.length > 0 &&
        this.props.mealSchedule.overrideSchedules.map(
          (overrideSchedule: OverrideSchedule, index: number) => {
            return (
              dateFns.isWithinInterval(
                this.state.currentDate,
                {
                  start: dateFns.parseISO(overrideSchedule.overrideStartDate),
                  end: dateFns.parseISO(overrideSchedule.overrideEndDate)
                },
                { unit: 'day' }
              ) && (
                <div key={index} className="daily-menu-container">
                  <Card className={this.props.classes.card}>
                    <CardActionArea
                      onClick={() => console.log('Menu Card Touched')}
                    >
                      <Divider />
                      <CardContent className={this.props.classes.cardcontent}>
                        <ul>
                          <Typography component="p">Schedule</Typography>
                        </ul>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              )
            );
          }
        )
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
        <Paper className="menu-schedule-week-navigator-container">
          <h6>
            {` Menu For ${dateFns.format(this.state.currentDate, 'd MMM', {
              awareOfUnicodeTokens: true
            })}`}{' '}
          </h6>
        </Paper>
        {buildMenu()}
        {buildMealSchedule()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return Object.assign({}, state, {
    schedule: state.schedules as Schedule[],
    subscriberId: state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule
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

  // extendedIcon: {
  //   marginRight: theme.spacing.unit,
  // },
});
// function mapDispatchToProps(dispatch:any) {
//   return({
//     addOverrrideSchedule: () => addOverrrideSchedule
//   })
// }

export default requireAuth(
  connect(mapStateToProps, { ...scheduleAction, ...mealscheduleAction })(
    withStyles(styles)(MenuDetails)
  )
);
