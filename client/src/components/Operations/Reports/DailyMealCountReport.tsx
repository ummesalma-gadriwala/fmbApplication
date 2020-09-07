import React, { Component } from 'react';
import {MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import requireAuth from '../../../requireAuth';
import { connect } from 'react-redux';
import * as adminReportsAction from '../../../reducers/adminReportsAction';
import * as scheduleAction from '../../../reducers/scheduleAction';
import { AppState, Schedule } from '../../../type/Type';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Spinner  from '../../Spinner/Spinner';


import './DailyMealCountReport.css';
const dateFns = require('date-fns');

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontWeight: "bold"
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
class DailyMealCountReport extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getScheduleForSelectedDate = this.getScheduleForSelectedDate.bind(this)
  }

  getScheduleForSelectedDate = (selectedDate: string) : Schedule => {
    return  this.props.schedules.find(
      schedule =>
        schedule.dailyDate === selectedDate
    ) as Schedule
  }
  componentDidMount() {
    if(this.props.schedules.length==0) {
      this.props.getMonthsSchedule()
    }
    const scheduleForToday = this.getScheduleForSelectedDate(dateFns.format(new Date(),'yyyy-MM-dd',{ awareOfUnicodeTokens: true }))
    this.setState({ noMeal: scheduleForToday?scheduleForToday.noMeal:false  })
    this.props.getMealCountBySectorForSelectedDate(dateFns.format(new Date(),'yyyy-MM-dd',{ awareOfUnicodeTokens: true }))
  }

  render() {
      let totalCount : number = 0;
      let totalRiceCount: number = 0;
      let totalNoRiceCount: number = 0;
      return (
        <div className= "daily-meal-count-report-container">
          <h5>Sector Wise Thali Count Report</h5>
          <Divider />
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                name={'selectedDate'}
                margin="normal"
                value={ this.state ? this.state.selectedDate : new Date()}
                onChange={value => {
                  const selectedDate = dateFns.format(value,'yyyy-MM-dd',{ awareOfUnicodeTokens: true })
                  const scheduleForSelectedDate = this.getScheduleForSelectedDate(selectedDate)
                  this.setState({selectedDate:value, noMeal: scheduleForSelectedDate && scheduleForSelectedDate.noMeal })
                  if(scheduleForSelectedDate) {
                    !scheduleForSelectedDate.noMeal && this.props.getMealCountBySectorForSelectedDate(selectedDate)
                  } else {
                    this.props.getMealCountBySectorForSelectedDate(selectedDate)
                  }
               }}                                      
            />
          </MuiPickersUtilsProvider>
          </div>
          <Divider />
          <div>
            <Spinner active={this.props.isBusyCommunicating}>
            <React.Fragment>
                { this.props.reportDailyThaliCount &&
                   <Paper>
                   { Object.keys(this.props.reportDailyThaliCount.sectorCounts).length == 0 || (this.state && this.state.noMeal) 
                     ? <div className="daily-meal-count-no-report-container">
                       <h6> Report Not Available!!</h6>
                      </div>   
                    : <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              <strong>Sector Name</strong>
                            </StyledTableCell >
                            <StyledTableCell align="right">
                              <strong>Rice Count</strong>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <strong>No Rice Count</strong>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <strong>Total Count</strong>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(this.props.reportDailyThaliCount.sectorCounts).map(
                            (key: any, index: any) => {
                              totalCount = totalCount + (this.props.reportDailyThaliCount.sectorCounts[key].tiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].cancellationScheduleCount + this.props.reportDailyThaliCount.sectorCounts[key].additionScheduleCount)
                              
                              totalRiceCount = totalRiceCount + ((this.props.reportDailyThaliCount.sectorCounts[key].tiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceTiffinCount) -
                                                                 (this.props.reportDailyThaliCount.sectorCounts[key].cancellationScheduleCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceCancellationCount)+
                                                                 (this.props.reportDailyThaliCount.sectorCounts[key].additionScheduleCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceAdditionCount))

                              totalNoRiceCount = totalNoRiceCount +   (this.props.reportDailyThaliCount.sectorCounts[key].noRiceTiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceCancellationCount + this.props.reportDailyThaliCount.sectorCounts[key].noRiceAdditionCount)
                              return (
                                <StyledTableRow key={index}>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                  >
                                    { key }
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    { 
                                       ((this.props.reportDailyThaliCount.sectorCounts[key].tiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceTiffinCount) -
                                       (this.props.reportDailyThaliCount.sectorCounts[key].cancellationScheduleCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceCancellationCount)+
                                       (this.props.reportDailyThaliCount.sectorCounts[key].additionScheduleCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceAdditionCount))
                                    }
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    { (this.props.reportDailyThaliCount.sectorCounts[key].noRiceTiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].noRiceCancellationCount + this.props.reportDailyThaliCount.sectorCounts[key].noRiceAdditionCount)  }
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    { (this.props.reportDailyThaliCount.sectorCounts[key].tiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].cancellationScheduleCount + this.props.reportDailyThaliCount.sectorCounts[key].additionScheduleCount)  }
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            }
                          )}
                        </TableBody>
                        <TableFooter>
                          <StyledTableRow >
                          <StyledTableCell>
                                <strong> Total Thali Count : </strong>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <strong>{ totalRiceCount }</strong>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <strong>{ totalNoRiceCount }</strong>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <strong>{ totalCount }</strong>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableFooter>
                      </Table>
                   }
                 </Paper>

                } 
            </React.Fragment>
            </Spinner>   
          </div>        
        </div>  
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return ( {
    reportDailyThaliCount: state.operations && state.operations.reportDailyThaliCount,
    isBusyCommunicating: state.isBusyCommunicating,
    schedules: state.schedules
  });
};

export default requireAuth(
  connect(mapStateToProps, {...adminReportsAction,...scheduleAction})(DailyMealCountReport)
);
