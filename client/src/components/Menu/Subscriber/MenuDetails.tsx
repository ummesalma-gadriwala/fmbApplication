import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import  requireAuth from '../../../requireAuth';
import { withStyles } from '@material-ui/core/styles';

import { ISchedule, IAppState, IMenu, IMenuItem, IOverrideSchedule } from '../../../type/Type'
import * as scheduleAction  from '../../../reducers/scheduleAction'
import * as mealscheduleAction  from '../../../reducers/mealscheduleAction'
import isWithinInterval from 'date-fns/esm/fp/isWithinInterval';

import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Divider from "@material-ui/core/Divider/Divider";

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
var dateFns = require('date-fns');

import './MenuSchedule.css'

class MenuDetails extends PureComponent<any, any> {
  
  constructor(props:any){
    super(props);
    const { match: { params } } = this.props;
    
    this.state = {
      weekStartDate: dateFns.startOfWeek( new Date()),
      activeWeekRelativeToCurrentWeek:0,
      currentDate:dateFns.parseISO(params.currentDate)
    }
  
    //isSameWeek
    //startOfWeek
  }

  componentDidMount(){
    //this.setState({isBusy : true});
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.schedule);
    if(this.props.schedule && this.props.schedule.length ==0) {
      this.props.getMonthsSchedule();
    }
    this.props.getSubscriptionSchedule(this.props.subscriberId);
  };

   render(){

    const buildMenuItem = (menuItems: IMenuItem[] | null, noMealReason:string )=>{
        return(
          menuItems && menuItems.map( (menuItem:IMenuItem, index:number) =>{
            return (
              <li key={index}> { menuItem.itemName }</li>
            )
          } )
        )
    }

    const buildMenu = () => {
      return this.props.schedule && this.props.schedule.length > 0 && this.props.schedule.map((day:ISchedule,index: number) => {
        return (
           day.dailyDate === this.state.currentDate &&
           <div key={index}  className="daily-menu-container">
            <Card className={this.props.classes.card}>
              <CardActionArea
                onClick = {()=> console.log('Menu Card Touched')} 
              >
                <Divider/>
                <CardContent className={this.props.classes.cardcontent}>
                  <ul>
                    <Typography component="p">
                    { buildMenuItem(day.menu && day.menu.items, day.noMealReason)  }
                    </Typography>
                  </ul>
                </CardContent>
              </CardActionArea>    
                
            </Card>
            </div>                    
          );
        }) 
      };

      const buildMealSchedule = () => {
        return this.props.mealSchedule && this.props.mealSchedule.overrideSchedules.length > 0 && this.props.mealSchedule.overrideSchedules.map((overrideSchedule:IOverrideSchedule,index: number) => {
          //console.log(`${dateFns.parseISO(new Date()).getTime()}`);
          //console.log(`${dateFns.parseISO(overrideSchedule.overrideEndDate)}`);
          return (
            //@ts-ignore
            
            dateFns.isWithinInterval( this.state.currentDate,{start : dateFns.parseISO(overrideSchedule.overrideStartDate), end:  dateFns.parseISO(overrideSchedule.overrideEndDate) }, {unit: 'day'}) &&
             <div key={index}  className="daily-menu-container">
              <Card className={this.props.classes.card}>
                <CardActionArea
                  onClick = {()=> console.log('Menu Card Touched')} 
                >
                  <Divider/>
                  <CardContent className={this.props.classes.cardcontent}>
                    <ul>
                      <Typography component="p">

                        Schedule

                      </Typography>
                    </ul>
                  </CardContent>
                </CardActionArea>    
                  
              </Card>
              </div>                    
            );
          }) 
        };
  

    const navigatePreviousWeek = () => {
      this.setState( {weekStartDate : dateFns.addWeeks(this.state.weekStartDate,-1)});
    }

    const navigateNextWeek = () => {
      this.setState( {weekStartDate : dateFns.addWeeks(this.state.weekStartDate,1)});
    }

    return(
      <div>
          <Paper className="menu-schedule-week-navigator-container">
            <h6>{ ` Menu For ${dateFns.format( this.state.currentDate, 'd MMM', {'awareOfUnicodeTokens': true})}` } </h6>
            
          </Paper> 
              {buildMenu()}
              {buildMealSchedule()}
      </div>
      
    )
  }

}


const mapStateToProps = (state: IAppState) => {
  console.log(state.schedule);
  return Object.assign({}, state, {
    schedule: state.schedule as ISchedule[],
    subscriberId: state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule
  });
};
const styles = (theme:any) => ({
  fab: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
    height:35,
    width:35
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  cardcontent: {
      padding:5,
      marginTop:5
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

export default requireAuth(connect(mapStateToProps, {...scheduleAction,...mealscheduleAction} ) (withStyles(styles) (MenuDetails)));
