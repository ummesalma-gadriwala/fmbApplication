import './PrintLabelsSectorWise.css';
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
  SectorCount,
  PackageTypeColor
} from '../../../type/Type';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Spinner from '../../Spinner/Spinner';
import { IconButton, TableFooter } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
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

class PrintLabelSectorWise extends React.Component<any, any> {
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
    let totalCount = 0;
    const buildTotalCountPacakageType = () =>
      Object.keys(PackageType).forEach((key: any) => {
        totalCountPacakageType[key] = 0;
      });
    buildTotalCountPacakageType();
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

    const generatePrintableLabels = overrideDetails => {
      overrideDetails = overrideDetails.sort((a, b) => {
        // First, sort by packageType
        if (a.packageType > b.packageType) {
          return 1;
        } else if (b.packageType > a.packageType) {
          return -1;
        } else {
          // If packageType is the same, sort alphabetically by FirstName
          const firstNameA = a.firstName || ''; // Default to an empty string if null or undefined
          const firstNameB = b.firstName || ''; // Default to an empty string if null or undefined
          return firstNameA.localeCompare(firstNameB);
        }
      });

      let tableRows = ''; // Initialize an empty string to store table rows
      let noOfThaali = 0;
      let prevColor = ''; // Variable to store the previous color

      // Loop through each sector in overrideDetails and create table rows
      Object.keys(overrideDetails).forEach((key, index) => {
        const sector = overrideDetails[key];
        // Check the value of sector.count
        const count = parseInt(sector.count); // Convert count to an integer
        if (count === 0) {
          // If count is 0, don't print the label
          return; // Skip this iteration
        } else {
          // Determine the color based on packageType
          let color = PackageTypeColor[sector.packageType];

          // Check if the current color is different from the previous color
          if (color !== prevColor) {
            noOfThaali = 1; // Reset noOfThaali to 1
            prevColor = color; // Update the previous color
          } else {
            noOfThaali += 1; // Increment noOfThaali
          }

          // If count is 1 or greater, print the label based on the count value
          for (let i = 0; i < count; i++) {
            // Create a table row with table cells for each detail
            tableRows += `
                <div class="print-div">
                  <table border="1" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td COLSPAN=2 align="center">${
                          sector.aefOrganizationLookup != null
                            ? sector.aefOrganizationLookup.orgId
                            : ''
                        }</td>
                      </tr>
                      <tr>
                        <td COLSPAN=2 align="center">${sector.firstName} ${
              sector.lastName
            }</td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size: 15px;">${
                          sector.sector
                        }</td>
                        <td align="center" style="font-size: 15px;">${color} <span style="font-size: 10px; ">
                           ${noOfThaali}
                        </span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>`;
          }
        }
      });

      // Create the complete HTML table with headers and rows
      const table = `
                    ${tableRows} <!-- Insert generated table rows -->
      
        `;
      return table; // Return the complete HTML table
    };

    const handlePrint = overrideDetails => {
      const printableLabels = generatePrintableLabels(overrideDetails);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
              <title>A4 Page Using CSS</title>
              <style>
              @media print {
                body, html, p {
                    margin: 0pt !important;
                    padding: 0pt !important;
                }
                @page {
                   margin: 0pt !important;
                   padding: 0pt !important;
                }
              } 
              .print-div {
                width: 114mm; /* Width is now the height in landscape */
                height: 81mm; /* Height is now the width in landscape */
                page-break-after: always;
                margin: 0;
                padding: 10px; /* Padding added on all sides */
                transform: rotate(-90deg) translateX(-100%);
                transform-origin: top left;
              }
              .print-div table {
                width: 100%; /* Adjusting table width considering padding */
                height: 100%; /* Adjusting table height considering padding */
                border-collapse: collapse;
              }
              .print-div table td {
                border: 1px solid black;
                text-align: center;
              }
              .print-div table td:nth-child(1) {
                font-size: 47px;
                font-weight: bold;
              }
              .print-div table td:nth-child(2) {
                font-size: 40px;
                font-weight: bold;
              }
              .print-div table td:nth-child(3),
              .print-div table td:nth-child(4) {
                font-size: 20px;
              }
            }
                </style>
            </head>
            <body>${printableLabels}</body>
          </html>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();

        // Wait for the content to load before printing
        printWindow.print();
        // printWindow.close(); // Close the window after printing
      } else {
        console.log('Could not open new window for printing');
      }
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
        <h5>Print Label Sector Wise</h5>
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
                                                  onClick={() =>
                                                    handlePrint(
                                                      this.props
                                                        .reportDailyThaliCount
                                                        .sectorCounts[sectorKey]
                                                        .overrideDetails
                                                    )
                                                  }
                                                  aria-label="Show more"
                                                >
                                                  <PrintIcon />
                                                </StyledIconButton>
                                              </div>
                                            </StyledTableCell>
                                          )}
                                        </React.Fragment>
                                      );
                                    }
                                  )}
                                </StyledTableRow>
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
    PrintLabelSectorWise
  )
);
