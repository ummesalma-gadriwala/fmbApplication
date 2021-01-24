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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';


import Spinner  from '../../Spinner/Spinner';


import './DailyMealCountReport.css';
import { Collapse, IconButton } from '@material-ui/core';
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

const StyledIconButton =  withStyles(theme => ({
  root: {
    display: 'inline-block',
    paddingTop:0,
    paddingBottom:0,
    minHeight: 0,
    minWidth: 0,   
  },
}))(IconButton);

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -21,
    top: 8,
    height:18,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Badge);


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
      // const expandClasses = classNames(this.props.classes.expand, {
      //   [this.props.classes.expandOpen]: this.state.expanded
      // });
      
      const handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded})
      }

      const buildCountDetails = (countDetails) => {
        countDetails && countDetails.sort((a,b) => (a.mealCountOverrideType > b.mealCountOverrideType) ? 1 : ((b.mealCountOverrideType > a.mealCountOverrideType) ? -1 : 0)); 
        return (
          countDetails &&
          countDetails.map((countDetail: any, index: number) => {
            return (
             <React.Fragment> 
             { !(countDetail.count === 0 && countDetail.mealCountOverrideType === 'REGULAR') &&
              <div className = "daily-meal-count-report-count-details-container">
                { !countDetail. noRice && 
                    <span className ="daily-meal-count-report-count-details-container-col-name">
                      
                      {countDetail  && countDetail.firstName? `${countDetail.firstName} ${countDetail.lastName}` :  countDetail.subscriberId}
                    </span>
                }
                { countDetail. noRice && 
                    <span className ="daily-meal-count-report-count-details-container-col-name">
                      <StyledBadge badgeContent={'NR'} color="secondary">
                       {countDetail  && countDetail.firstName? `${countDetail.firstName} ${countDetail.lastName}` :  countDetail.subscriberId}
                       </StyledBadge> 
                    </span>
                }
                <span className ="daily-meal-count-report-count-details-container-col">
                  {countDetail && countDetail.mealCountOverrideType}
                </span>
                <span className ="daily-meal-count-report-count-details-container-col">
                  {countDetail && countDetail.count}
                </span>
                <Divider />
              </div>
             }
             </React.Fragment>
            );
          })
        );
      };
      
  
      const details = (countDetails) => {
        return(
          this.state && this.state.expanded ? (
            <StyledTableRow>
              <StyledTableCell colSpan={4}>
                <Collapse in={this.state.expanded} unmountOnExit={true}>
                  { buildCountDetails(countDetails) }
                </Collapse>
              </StyledTableCell>
            </StyledTableRow>
          ) 
          : null
        );
      }


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
                                <React.Fragment>
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
                                      <div className= "daily-meal-count-report-expand-more">
                                        <span>
                                        { (this.props.reportDailyThaliCount.sectorCounts[key].tiffinCount - this.props.reportDailyThaliCount.sectorCounts[key].cancellationScheduleCount + this.props.reportDailyThaliCount.sectorCounts[key].additionScheduleCount)  }
                                        </span>
                                        <StyledIconButton
                                          onClick={handleExpandClick}
                                          aria-label="Show more">
                                          <ExpandMoreIcon />
                                        </StyledIconButton>
                                      </div> 
                                    </StyledTableCell>
                                        
                                  </StyledTableRow>
                                  {details(this.props.reportDailyThaliCount.sectorCounts[key].overrideDetails)}
                                </React.Fragment>
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
