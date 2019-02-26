import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import  requireAuth from '../../../requireAuth';

import { ISchedule, IAppState } from '../../../type/Type'
import * as scheduleAction  from '../../../reducers/scheduleAction'

import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
var dateFns = require('date-fns');




import './MenuSchedule.css'

class MenuSchedule extends PureComponent<any, any> {
  
  constructor(props:any){
    super(props);
    this.state = {
      weekStartDate: dateFns.startOfWeek( new Date()),
      activeWeekRelativeToCurrentWeek:0
    }
    console.log(this.state);
    console.log(dateFns.addWeeks(new Date(),1));
    
    //isSameWeek
    //startOfWeek
  }

  componentDidMount(){
    //this.setState({isBusy : true});
    console.log(this.props.schedule);
    if(this.props.schedule && this.props.schedule.length ==0) {
      this.props.getMonthsSchedule();
    }
  };

   render(){
    const buildMenu = () => {
       
      return this.props.schedule && this.props.schedule.length > 0 && this.props.schedule.map((day:ISchedule,index: number) => {
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {day.dailyDate}
            </TableCell>
            <TableCell align="right">
             {day.noMealReason}
            </TableCell>
         </TableRow>
        );
      }) 
      
    }
    return(
      <div>
        Menu
        <Paper className ="Margin-Container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day of Week</TableCell>
                <TableCell align="right">Number of thalis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildMenu()}
            </TableBody>
          </Table>
        </Paper>
        
      </div>
      
    )
  }

}


const mapStateToProps = (state: IAppState) => {
  console.log(state.schedule);
  return Object.assign({}, state, {
    schedule: state.schedule as ISchedule[]
  });
};
// function mapDispatchToProps(dispatch:any) {
//   return({
//     addOverrrideSchedule: () => addOverrrideSchedule
//   })
// }

export default requireAuth(connect(mapStateToProps, scheduleAction) (MenuSchedule));
