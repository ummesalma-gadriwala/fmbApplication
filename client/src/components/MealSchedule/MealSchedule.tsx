import 'date-fns';
import  React, { Component } from 'react';
import  requireAuth from '../../requireAuth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { OverrideSchedule, AppState } from '../../type/Type'
import './MealSchedule.css';
import getOverlappingDaysInRanges from 'date-fns/esm/fp/getOverlappingDaysInIntervals';
import * as mealscheduleAction  from '../../reducers/mealscheduleAction'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';
import ListOverrideMealSchedule from './ListOverrideMealSchedule';
import Divider from '@material-ui/core/Divider';

var dateFns = require('date-fns');

interface IMealScheduleState {
  existingPlanOverrides ?: [OverrideSchedule];
  newPlanOverride:OverrideSchedule
  thaliSchedule: Object;
  isBusy: boolean;
  isInValid: boolean;
}

class MealSchedule extends Component<any, IMealScheduleState> {
  constructor(props: any) {
    super(props);
    this.handleMealCountChange = this.handleMealCountChange.bind(this);
    const newPlanOverride:OverrideSchedule= {
          overrideStartDate: dateFns.addWeeks(new Date(),2),
          overrideEndDate:dateFns.addWeeks(new Date(),3),
          weeklyOverrideSchedule : {
            MONDAY:null,
            TUESDAY:null,
            WEDNESDAY:null,
            THURSDAY:null,
            FRIDAY:null
          }
    };
    this.state = {
         newPlanOverride:newPlanOverride,
         thaliSchedule : {},
         isBusy:false,
         isInValid: false
    }
  };
  componentDidMount(){
    this.setState({isBusy : true});
    this.props.getSubscriptionSchedule(this.props.subscriberId);
  };
 
  componentDidUpdate(prevProps:any) {
    if(this.props.mealSchedule !== prevProps.mealSchedule && this.props.mealSchedule.optedSchedule){
      this.setState({
        isBusy:false,
        thaliSchedule: this.props.mealSchedule.optedSchedule,
        existingPlanOverrides: this.props.mealSchedule.overrideSchedules
      });
    }
    if(this.props.mealSchedule !== prevProps.mealSchedule && this.props.mealSchedule.overrideSchedules != prevProps.mealSchedule.overrideSchedules){
      this.setState({
        isBusy:false,
        existingPlanOverrides: this.props.mealSchedule.overrideSchedules
      });
    }
  };

  handleMealCountChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name : string = target.name;
    const changedOverridePlan:OverrideSchedule = Object.assign({}, this.state.newPlanOverride);
    const changedKey = Object.keys(this.state.newPlanOverride.weeklyOverrideSchedule).find( key => key===name);
    //@ts-ignore
    changedOverridePlan.weeklyOverrideSchedule[changedKey]= value;
    this.setState({
      newPlanOverride: changedOverridePlan 
    });
  };
 
  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }; 
    // const buildSchedule = () => {
    //   return this.state.thaliSchedule && Object.keys(this.state.thaliSchedule).length > 0 ? Object.keys(this.state.thaliSchedule).map((day:any,index) => {
    //     return (
    //       <TableRow key={index}>
    //         <TableCell component="th" scope="row">
    //           {day}
    //         </TableCell>
    //         <TableCell align="right">
    //           <Select
    //             name={day}
    //             //@ts-ignore
    //             value={ this.state && this.state.newPlanOverride.weeklyOverrideSchedule[day] ? this.state.newPlanOverride.weeklyOverrideSchedule[day] : this.state.thaliSchedule[day]}
    //             onChange={this.handleMealCountChange}
    //             input={<Input id= {day} />}
    //             MenuProps={MenuProps}
    //           > 
    //             <MenuItem key="0" value="0">No Thali</MenuItem>
    //             <MenuItem key="1" value="1">1 </MenuItem>
    //             <MenuItem key="2" value="2">2 </MenuItem>
    //             <MenuItem key="3" value="3">3 </MenuItem>
    //             <MenuItem key="4" value="4">4 </MenuItem>
    //           </Select>
    //         </TableCell>
    //      </TableRow>
    //     );
    //   }) 
    //   : null;
    // }
    const validateAndOverride = () => {
      this.setState({ isInValid : false});
      const isValidDate : boolean = (dateFns.differenceInHours(this.state.newPlanOverride.overrideEndDate, this.state.newPlanOverride.overrideStartDate) < 0);
      this.setState({ isInValid : isValidDate })
        
      //Overlapping 

      // this.props.mealSchedule.overrideSchedules.forEach((overrideSchedule:IOverrideSchedule )=> {
      //   //@ts-ignore
      //   console.log();
      //   const overLappingDays = getOverlappingDaysInRanges(
      //       { start: new Date(`${overrideSchedule.overrideStartDate}T12:00:00Z`), end: new Date(`${overrideSchedule.overrideEndDate}T12:00:01Z`)},
      //       { start: this.state.newPlanOverride.overrideStartDate, end: this.state.newPlanOverride.overrideEndDate }
      //   );
      //  if(overLappingDays > 0) {
      //   this.setState({ isInValid : true});
      //   return;
      //  }
    
      // });
      
      if (!isValidDate) {
        this.setState({isBusy : true});
        const cancelPlan:OverrideSchedule = Object.assign({}, this.state.newPlanOverride);
        cancelPlan.weeklyOverrideSchedule.MONDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.TUESDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.WEDNESDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.THURSDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.FRIDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.SATURDAY=  "0";
        cancelPlan.weeklyOverrideSchedule.SUNDAY=  "0";
        this.setState({
          newPlanOverride: cancelPlan 
        });
        return this.props.addOverrideSchedule(this.props.subscriberId, this.state.newPlanOverride,null, () => this.setState({ isBusy: false }));
      }
    }                    

    return (
            <div className="MainSchedule-Container">
              { this.state.isInValid  &&
                <div>
                     <Alert color="warning">Please Enter Valid Date</Alert>
                </div>   
              }
              <Spinner active= { this.state.isBusy } >
                <ListOverrideMealSchedule
                 overrideSchedules = { this.props.mealSchedule.overrideSchedules}
                 deleteOverrideScheduleFunc = { this.props.deleteOverrideSchedule }
                 subscriberId = { this.props.subscriberId }
                /> 
                <div className ="Margin-Container">
                  <h6> Vacation Planner </h6>
                  <Divider/>
                  <p>Please select dates where you dont want thali prepared for your family</p>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className ="MealSchedule-Datepicker-Container">
                      <DatePicker  
                        name={"startDate"}
                        minDate = { dateFns.format( dateFns.addWeeks(new Date(),2),'yyyy-MM-dd',{ awareOfUnicodeTokens: true }) }
                        maxDate = { dateFns.format( dateFns.addMonths(new Date(),2),'yyyy-MM-dd',{ awareOfUnicodeTokens: true }) }
                        margin="normal"
                        label="From Date"
                        value={ this.state.newPlanOverride.overrideStartDate }
                        onChange={ (value)=> {
                          const changedOverridePlan:OverrideSchedule = Object.assign({}, this.state.newPlanOverride);
                          changedOverridePlan.overrideStartDate= value;   
                          this.setState({newPlanOverride:changedOverridePlan});
                        }}
                      />
                      <DatePicker  
                        name={"endDate"}
                        minDate = { dateFns.addWeeks(new Date(),3) }
                        maxDate = { dateFns.addMonths(new Date(),3) }
                        margin="normal"
                        label="To Date"
                        value={ this.state.newPlanOverride.overrideEndDate }
                        onChange={ (value)=> {
                          const changedOverridePlan:OverrideSchedule = Object.assign({}, this.state.newPlanOverride);
                          changedOverridePlan.overrideEndDate= value;      
                          this.setState({newPlanOverride:changedOverridePlan});
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                  
                  {/* <Paper className ="Margin-Container">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Day of Week</TableCell>
                          <TableCell align="right">Number of thalis</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {buildSchedule()}
                      </TableBody>
                    </Table>
                  </Paper> */}
                  <div className ="Margin-Container">
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      //@ts-ignore
                      onClick={()=> validateAndOverride()}
                    >
                      Cancel Thali
                    </Button>
                  </div>
                </div>  
              </Spinner>  
             </div> 

                
    );
  }
};
const mapStateToProps = (state: AppState) => {
  return Object.assign({}, state, {
    subscriberId : state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule
  });
};
// function mapDispatchToProps(dispatch:any) {
//   return({
//     addOverrrideSchedule: () => addOverrrideSchedule
//   })
// }

export default requireAuth(connect(mapStateToProps, mealscheduleAction) (MealSchedule));