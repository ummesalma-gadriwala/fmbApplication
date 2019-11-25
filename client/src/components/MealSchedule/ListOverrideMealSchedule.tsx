import  React, { Component } from 'react';
import { OverrideSchedule } from '../../type/Type';
import Button  from '@material-ui/core/Button';
import IconButton  from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './MealSchedule.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

var dateFns = require('date-fns');

const styles = (theme:any) => ({
  root: {
    padding: "3px 5px 4px 20px"
  },
});

 class ListOverrideMealSchedule extends Component<any, any> {
  constructor(props:any) {
    super(props);
  }


  render() {
    return (
      <div className ="Margin-Container">
      { this.props.overrideSchedules && this.props.overrideSchedules.length > 0 &&
        <div>
          <h6 className="Margin-Container"> Current Cancellation Schedules  </h6>
          
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={this.props.classes.root}> From Date</TableCell>
                  <TableCell className={this.props.classes.root}>To Date</TableCell>
                  <TableCell className={this.props.classes.root} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { this.props.overrideSchedules.map( (overrideSchedule:OverrideSchedule, index:any) =>{
                return(
                  <TableRow key={index}>
                    <TableCell  className={this.props.classes.root}  component="th" scope="row">
                    {dateFns.format(dateFns.parseISO(overrideSchedule.overrideStartDate), 'yyyy-MM-dd',{'awareOfUnicodeTokens': true})}
                    </TableCell>
                    <TableCell className={this.props.classes.root} >
                    {dateFns.format(dateFns.parseISO(overrideSchedule.overrideEndDate), 'yyyy-MM-dd',{'awareOfUnicodeTokens': true})}
                    </TableCell>
                    <TableCell className={this.props.classes.root} align="left">
                     <div className="Override-OP-Container">
                      <IconButton  aria-label="Delete"  //@ts-ignore
                      onClick={()=> this.props.deleteOverrideScheduleFunc(this.props.subscriberId,overrideSchedule.overrideStartDate )} >
                        <span>
                          <DeleteIcon fontSize="small"/>
                        </span>
                      </IconButton>
                     </div>
                    </TableCell>
                  
                </TableRow>);  
              })
              }
              </TableBody>
            </Table>
          </Paper>
        </div>
      }
      </div>
    );
  }

}
export default withStyles(styles)(ListOverrideMealSchedule)