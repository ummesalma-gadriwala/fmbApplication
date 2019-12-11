import React, { Component } from 'react';
import {MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import requireAuth from '../../../requireAuth';
import { connect } from 'react-redux';
import * as adminReportsAction from '../../../reducers/adminReportsAction';
import { AppState, SectorCountSelectedDate, SectorCount } from '../../../type/Type';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//import { Spinner } from '../../Spinner/Spinner';


import './DailyMealCountReport.css';
const dateFns = require('date-fns');

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
  }

  componentDidMount() {
    const currentDate = dateFns.format(new Date(),'yyyy-MM-dd',{ awareOfUnicodeTokens: true })
    this.setState({selectedDate: currentDate})
    this.props.getMealCountBySectorForSelectedDate(currentDate)
  }

  render() {
      let totalCount : Number = 0;
      return (
        <div className= "daily-meal-count-report-container">
          <h5>Sector Wise Thali Count Report</h5>
          <Divider />
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                  name={'selectedDate'}
                  margin="normal"
                  value={ this.state && this.state.selectedDate}
                  onChange={value => {
                    console.log(dateFns.format(value,'yyyy-MM-dd',{ awareOfUnicodeTokens: true }))
                    const selectedDate = dateFns.format(value,'yyyy-MM-dd',{ awareOfUnicodeTokens: true })
                    this.setState({selectedDate:value})
                    this.props.getMealCountBySectorForSelectedDate(selectedDate)
                  }}                                      
                />
          </MuiPickersUtilsProvider>
          </div>
          <Divider />
          <div>
            <React.Fragment>
                { this.props.reportDailyThaliCount &&
                   <Paper>
                   { Object.keys(this.props.reportDailyThaliCount.sectorCounts).length == 0 &&
                     <div className="daily-meal-count-no-report-container">
                       <h6> Report Not Available!!</h6>
                      </div>   
                   }
                   { Object.keys(this.props.reportDailyThaliCount.sectorCounts).length > 0 &&  
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              <strong>Sector Name</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                            <strong>Count</strong>
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(this.props.reportDailyThaliCount.sectorCounts).map(
                            (key: any, index: any) => {
                              totalCount = totalCount +  this.props.reportDailyThaliCount.sectorCounts[key]
                              return (
                                <StyledTableRow key={index}>
                                  <StyledTableCell
                                    component="th"
                                    scope="row"
                                  >
                                    { key }
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    { this.props.reportDailyThaliCount.sectorCounts[key] }
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
                            <StyledTableCell>
                                <strong>{ totalCount }</strong>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableFooter>
                      </Table>
                   }
                 </Paper>

                } 
            </React.Fragment>   
          </div>        
        </div>  
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return ( {
    reportDailyThaliCount: state.operations && state.operations.reportDailyThaliCount,
    
  });
};

export default requireAuth(
  connect(mapStateToProps, adminReportsAction)(DailyMealCountReport)
);
