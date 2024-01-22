import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import requireAuth from '../../../requireAuth';
import { connect } from 'react-redux';
import * as adminReportsAction from '../../../reducers/adminReportsAction';
import * as scheduleAction from '../../../reducers/scheduleAction';
import {
  AppState,
  Schedule,
  PackageColor,
  PackageColorType,
  PackageType,
  PackageTypeColor,
  SectorCount
} from '../../../type/Type';
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
import Spinner from '../../Spinner/Spinner';
import './DailyMealCountReport.css';
import { Collapse, IconButton } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dateFns = require('date-fns');

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 10,
    fontWeight: 'bold',
    padding: 8
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const StyledIconButton = withStyles(theme => ({
  root: {
    display: 'inline-block',
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 0,
    minWidth: 0
  }
}))(IconButton);

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -31,
    top: 8,
    height: 18,
    border: `2px solid ${theme.palette.background.paper}`
  }
}))(Badge);

class DailyMealCountReportV2 extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getScheduleForSelectedDate = this.getScheduleForSelectedDate.bind(
      this
    );
  }

  getScheduleForSelectedDate = (selectedDate: string): Schedule => {
    return this.props.schedules.find(
      schedule => schedule.dailyDate === selectedDate
    ) as Schedule;
  };
  componentDidMount() {
    console.log('componentDidMount DailyMealCountReportV2', this.props);
    if (this.props.schedules.length == 0) {
      this.props.getMonthsSchedule();
    }
    const scheduleForToday = this.getScheduleForSelectedDate(
      dateFns.format(new Date(), 'yyyy-MM-dd', { awareOfUnicodeTokens: true })
    );
    this.setState({
      noMeal: scheduleForToday ? scheduleForToday.noMeal : false
    });
    this.props.getMealCountBySectorForSelectedDateV2(
      dateFns.format(new Date(), 'yyyy-MM-dd', { awareOfUnicodeTokens: true })
    );
  }

  render() {
    const sectorCounts: SectorCount[] = this.props.reportDailyThaliCount
      .sectorCounts;
    const totalCountPacakageType = {};
    const buildTotalCountPacakageType = () =>
      Object.keys(PackageType).forEach((key: any) => {
        totalCountPacakageType[key] = 0;
      });
    buildTotalCountPacakageType();
    let totalCount = 0;
    const handleExpandClick = () => {
      this.setState({ expanded: !this.state.expanded });
    };

    const buildSectorNameCell = (sectorKey: string) => {
      return (
        <StyledTableCell component="th" scope="row">
          {sectorKey}
        </StyledTableCell>
      );
    };

    const calculateSectorPackageCount = (
      sectorKey: any,
      packageTypeTiffinCountKey: any
    ) => {
      let sectorPackageCount = 0;
      sectorPackageCount =
        this.props.reportDailyThaliCount.sectorCounts[sectorKey]
          .packageTypeTiffinCount[packageTypeTiffinCountKey] &&
        this.props.reportDailyThaliCount.sectorCounts[sectorKey]
          .packageTypeTiffinCount[packageTypeTiffinCountKey].actualCount +
        this.props.reportDailyThaliCount.sectorCounts[sectorKey]
          .packageTypeTiffinCount[packageTypeTiffinCountKey].additionCount -
        this.props.reportDailyThaliCount.sectorCounts[sectorKey]
          .packageTypeTiffinCount[packageTypeTiffinCountKey]
          .cancellationCount;
      return sectorPackageCount;
    };

    const calculateTotalCount = (
      sectorPackageCount: number,
      sectorCount: number,
      packageTypeTiffinCountKey: any
    ) => {
      if (!isNaN(sectorPackageCount)) {
        sectorCount = sectorCount + sectorPackageCount;
        if (!isNaN(totalCountPacakageType[packageTypeTiffinCountKey])) {
          totalCountPacakageType[packageTypeTiffinCountKey] =
            totalCountPacakageType[packageTypeTiffinCountKey] +
            sectorPackageCount;
        } else {
          totalCountPacakageType[
            packageTypeTiffinCountKey
          ] = sectorPackageCount;
        }
      }
      return sectorCount;
    };

    const buildCountDetails = countDetails => {

      return (
        countDetails &&
        countDetails.map((countDetail: any, index: number) => {
          return (
            <React.Fragment key={'count-details-container-' + index}>
              {!(
                countDetail.count === 0 &&
                countDetail.mealCountOverrideType === 'REGULAR'
              ) && (
                  <div className="daily-meal-count-report-count-details-container">
                    {countDetail.packageType && (
                      <span className="daily-meal-count-report-count-details-container-col-name">
                        <StyledBadge
                          badgeContent={PackageTypeColor[countDetail.packageType]}
                          color={
                            PackageTypeColor[countDetail.packageType] ===
                              PackageColor.Blue
                              ? 'primary'
                              : 'secondary'
                          }
                        >
                          {countDetail && countDetail.firstName
                            ? `${countDetail.firstName} ${countDetail.lastName}`
                            : countDetail.subscriberId}
                        </StyledBadge>
                      </span>
                    )}
                    <span className="daily-meal-count-report-count-details-container-col">
                      {countDetail && countDetail.mealCountOverrideType}
                    </span>
                    <span className="daily-meal-count-report-count-details-container-col">
                      {countDetail && countDetail.count}
                    </span>
                    <Divider />
                  </div>
                )}
            </React.Fragment>
          );
        })
      );
    };

    // const details = countDetails => {
    //   return this.state && this.state.expanded ? (
    //     <StyledTableRow>
    //       <StyledTableCell colSpan={4}>
    //         <Collapse in={this.state.expanded} unmountOnExit={true}>
    //           {buildCountDetails(countDetails)}
    //         </Collapse>
    //       </StyledTableCell>
    //     </StyledTableRow>
    //   ) : null;
    // };

    const details = countDetails => {
      const order = { CANCEL: 0, REGULAR: 1, ADD: 2 };
      const packageOrder = { Single: 0, Medium: 1, Regular: 2 };

      countDetails = countDetails.slice().sort((a, b) => {
        const orderComparison = order[a.mealCountOverrideType] - order[b.mealCountOverrideType];

        if (orderComparison !== 0) {
          return orderComparison;
        } else if (a.mealCountOverrideType === 'CANCEL') {
          // Keep the same logic for CANCEL type
          return 0;
        } else {
          // For REGULAR and ADD types, sort by packageType first
          const packageComparison = packageOrder[a.packageType] - packageOrder[b.packageType];

          if (packageComparison !== 0) {
            return packageComparison;
          } else {
            // If packageType is the same, sort by firstName and then lastName
            const nameComparison = (a.firstName || '').localeCompare(b.firstName || '');

            if (nameComparison !== 0) {
              return nameComparison;
            } else {
              return (a.lastName || '').localeCompare(b.lastName || '');
            }
          }
        }
      });


      return this.state && this.state.expanded ? (
        <StyledTableRow>
          <StyledTableCell colSpan={4}>
            <Collapse in={this.state.expanded} unmountOnExit={true}>
              {buildCountDetails(countDetails)}
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      ) : null;
    };

    const buildHeader = () => {
      return (
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <strong>Sector</strong>
            </StyledTableCell>
            {Object.keys(PackageColor).map((key: any, index: any) => {
              return (
                <StyledTableCell key={'package-color-' + key}>
                  <strong>{key}</strong>
                  <div>
                    <span>({PackageColorType[key]})</span>
                  </div>
                </StyledTableCell>
              );
            })}
            <StyledTableCell align="right">
              <strong>Total</strong>
            </StyledTableCell>
          </TableRow>
        </TableHead>
      );
    };
    return (
      <div className="daily-meal-count-report-container">
        <h5>Sector Wise Thali Count Report</h5>
        <Divider />
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              name={'selectedDate'}
              margin="normal"
              value={this.state ? this.state.selectedDate : new Date()}
              onChange={value => {
                const selectedDate = dateFns.format(value, 'yyyy-MM-dd', {
                  awareOfUnicodeTokens: true
                });
                const scheduleForSelectedDate = this.getScheduleForSelectedDate(
                  selectedDate
                );
                this.setState({
                  selectedDate: value,
                  noMeal:
                    scheduleForSelectedDate && scheduleForSelectedDate.noMeal
                });
                if (scheduleForSelectedDate) {
                  !scheduleForSelectedDate.noMeal &&
                    this.props.getMealCountBySectorForSelectedDateV2(
                      selectedDate
                    );
                } else {
                  this.props.getMealCountBySectorForSelectedDateV2(
                    selectedDate
                  );
                }
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <Divider />
        <div>
          <Spinner active={this.props.isBusyCommunicating}>
            <React.Fragment>
              {this.props.reportDailyThaliCount && (
                <Paper>
                  {Object.keys(sectorCounts).length == 0 ||
                    (this.state && this.state.noMeal) ? (
                    <div className="daily-meal-count-no-report-container">
                      <h6> Report Not Available!!</h6>
                    </div>
                  ) : (
                    <Table>
                      {buildHeader()}
                      <TableBody>
                        {Object.keys(sectorCounts).map(
                          (sectorKey: any, sectorIndex: any) => {
                            let sectorCount = 0;
                            return (
                              <React.Fragment
                                key={'sector-container-' + sectorIndex}
                              >
                                <StyledTableRow>
                                  {buildSectorNameCell(sectorKey)}
                                  {Object.values(PackageColorType).map(
                                    (
                                      packageTypeTiffinCountKey: any,
                                      packageTypeTiffinCountIndex: any
                                    ) => {
                                      const sectorPackageCount = calculateSectorPackageCount(
                                        sectorKey,
                                        packageTypeTiffinCountKey
                                      );
                                      sectorCount = calculateTotalCount(
                                        sectorPackageCount,
                                        sectorCount,
                                        packageTypeTiffinCountKey
                                      );
                                      return (
                                        <React.Fragment
                                          key={
                                            packageTypeTiffinCountKey +
                                            '-' +
                                            packageTypeTiffinCountIndex
                                          }
                                        >
                                          <StyledTableCell>
                                            {sectorPackageCount
                                              ? sectorPackageCount
                                              : 0}
                                          </StyledTableCell>
                                          {Object.keys(PackageType).length -
                                            1 ===
                                            packageTypeTiffinCountIndex && (
                                              <StyledTableCell>
                                                <div className="daily-meal-count-report-expand-more">
                                                  <span>{sectorCount}</span>
                                                  <StyledIconButton
                                                    onClick={handleExpandClick}
                                                    aria-label="Show more"
                                                  >
                                                    <ExpandMoreIcon />
                                                  </StyledIconButton>
                                                </div>
                                              </StyledTableCell>
                                            )}
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </StyledTableRow>
                                {details(
                                  this.props.reportDailyThaliCount.sectorCounts[
                                    sectorKey
                                  ].overrideDetails
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                      </TableBody>
                      <TableFooter>
                        <StyledTableRow>
                          <StyledTableCell>
                            <strong> Total Thali Count : </strong>
                          </StyledTableCell>
                          {Object.keys(PackageType).map(
                            (packageTypeTiffinCountKey: any) => {
                              if (
                                !isNaN(
                                  totalCountPacakageType[
                                  packageTypeTiffinCountKey
                                  ]
                                )
                              ) {
                                totalCount =
                                  totalCount +
                                  totalCountPacakageType[
                                  packageTypeTiffinCountKey
                                  ];
                              }
                              return (
                                <React.Fragment
                                  key={
                                    'total-count-' + packageTypeTiffinCountKey
                                  }
                                >
                                  <StyledTableCell>
                                    <strong>
                                      {
                                        totalCountPacakageType[
                                        packageTypeTiffinCountKey
                                        ]
                                      }
                                    </strong>
                                  </StyledTableCell>
                                </React.Fragment>
                              );
                            }
                          )}
                          <StyledTableCell>
                            <strong>{totalCount}</strong>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableFooter>
                    </Table>
                  )}
                </Paper>
              )}
            </React.Fragment>
          </Spinner>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    reportDailyThaliCount:
      state.operations && state.operations.reportDailyThaliCount,
    isBusyCommunicating: state.isBusyCommunicating,
    schedules: state.schedules
  };
};

export default requireAuth(
  connect(mapStateToProps, { ...adminReportsAction, ...scheduleAction })(
    DailyMealCountReportV2
  )
);
