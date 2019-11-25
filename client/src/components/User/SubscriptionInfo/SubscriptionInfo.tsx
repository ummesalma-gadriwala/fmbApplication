import React from "react";
import { connect } from 'react-redux';
import  requireAuth from '../../../requireAuth';
import { OverrideSchedule, IAppState } from '../../../type/Type'
import * as mealscheduleAction  from '../../../reducers/mealscheduleAction'

import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class SubscriptionInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleMealCountChange = this.handleMealCountChange.bind(this);
    const newPlan:any = {
            MONDAY:null,
            TUESDAY:null,
            WEDNESDAY:null,
            THURSDAY:null,
            FRIDAY:null
          
    };
    this.state = {
      newPlan:newPlan,
      thaliSchedule : {},
      isBusy:false,
      isInValid: false
    }
  }

  componentDidMount() {
    this.props.getSubscriptionSchedule(this.props.subscriberId);
  }

  componentDidUpdate(prevProps:any) {
    if(this.props.mealSchedule !== prevProps.mealSchedule && this.props.mealSchedule.optedSchedule){
      this.setState({
        isBusy:false,
        thaliSchedule: this.props.mealSchedule.optedSchedule
      });
    }
    
  };

  continue = (e: any) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e: any) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleMealCountChange(event: any) {
    const target = event.target;
    const value = target.value;
    const name : string = target.name;
    //const changedOverridePlan:IOverrideSchedule = Object.assign({}, this.state.newPlanOverride);
    //const changedKey = Object.keys(this.state.newPlanOverride.weeklyOverrideSchedule).find( key => key===name);
    //@ts-ignore
    // changedOverridePlan.weeklyOverrideSchedule[changedKey]= value;
    // this.setState({
    //   newPlanOverride: changedOverridePlan 
    // });
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
    
    const buildSchedule = () => {
      return this.state.thaliSchedule && Object.keys(this.state.thaliSchedule).length > 0 ? Object.keys(this.state.thaliSchedule).map((day:any,index) => {
        return (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {day}
            </TableCell>
            <TableCell align="right">
              <Select
                name={day}
                //@ts-ignore
                value={ this.state && this.state.thaliSchedule[day] ? this.state.thaliSchedule[day] : '' }
                onChange={this.handleMealCountChange}
                input={<Input id= {day} />}
                MenuProps={MenuProps}
                readOnly
                disabled
              > 
                <MenuItem key="0" value="0">No Thali</MenuItem>
                <MenuItem key="1" value="1">1 </MenuItem>
                <MenuItem key="2" value="2">2 </MenuItem>
                <MenuItem key="3" value="3">3 </MenuItem>
                <MenuItem key="4" value="4">4 </MenuItem>
              </Select>
            </TableCell>
         </TableRow>
        );
      }) 
      : null;
    }
    return (
      <div>
        Subscription
         <Paper className ="Margin-Container">
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
        </Paper>
        <FormControl margin="dense" className="col-xs-6 col-sm-5  col-lg-5">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.back}
          >
            Back
          </Button>
        </FormControl>
        <FormControl margin="dense" className="col-xs-6 col-sm-5  col-lg-5">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.continue}
          >
            Next
          </Button>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return Object.assign({}, state, {
    subscriberId : state.authentication.decodedToken.subscriberId,
    mealSchedule: state.mealSchedule
  });
};

export default requireAuth(connect(mapStateToProps, mealscheduleAction) (SubscriptionInfo));

