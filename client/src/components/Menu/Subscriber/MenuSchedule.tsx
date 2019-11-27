import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import requireAuth from '../../../requireAuth';
import { withStyles } from '@material-ui/core/styles';

import { Schedule, AppState, Menu, MenuItem } from '../../../type/Type';
import * as scheduleAction from '../../../reducers/scheduleAction';

import FormControl from '@material-ui/core/FormControl/FormControl';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider/Divider';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import DeleteIcon from '@material-ui/icons/Delete';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './MenuSchedule.css';

const dateFns = require('date-fns');

class MenuSchedule extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      weekStartDate: dateFns.startOfWeek(new Date()),
      activeWeekRelativeToCurrentWeek: 0
    };
    console.log(this.state);
    console.log(dateFns.addWeeks(new Date(), 1));

    //isSameWeek
    //startOfWeek
  }

  componentDidMount() {
    //this.setState({isBusy : true});
    console.log(this.props.schedule);
    if (this.props.schedule && this.props.schedule.length == 0) {
      this.props.getMonthsSchedule();
    }
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
                  >
                    <CardHeader
                      title={dateFns.format(
                        dateFns.parseISO(day.dailyDate),
                        'd MMM yy',
                        { awareOfUnicodeTokens: true }
                      )}
                    />
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
          <Fab
            onClick={() => navigatePreviousWeek()}
            aria-label="Open Dashboard"
            className={this.props.classes.fab}
          >
            <NavigateBeforeIcon />
          </Fab>
          <h6>
            {` Menu for week of ${dateFns.format(
              this.state.weekStartDate,
              'd MMM',
              { awareOfUnicodeTokens: true }
            )}`}{' '}
          </h6>
          <Fab
            onClick={() => navigateNextWeek()}
            className={this.props.classes.fab}
          >
            <NavigateNextIcon />
          </Fab>
        </Paper>
        {buildMenu()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  console.log(state.schedule);
  return Object.assign({}, state, {
    schedule: state.schedule as Schedule[]
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
  connect(mapStateToProps, scheduleAction)(withStyles(styles)(MenuSchedule))
);
