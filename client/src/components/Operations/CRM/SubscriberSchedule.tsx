import './SectorSubscriberList.css'
import React, { useEffect, useState } from 'react';
import requireAuth from '../../../requireAuth';
import { connect, useDispatch, useSelector } from 'react-redux';
import {getSectorNames} from '../../../reducers/contentAction';
import {deleteOverrideSchedule} from '../../../reducers/mealscheduleAction';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { AppState, SubscriptionSchedule } from '../../../type/Type';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import { Link } from 'react-router-dom';
import ListOverrideMealSchedule from '../../MealSchedule/ListOverrideMealSchedule';
import { Input, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const SubcriberSchedule =  ({susbcriber, getSectorNames, deleteOverrideSchedule}) => {
  const [sector, setSector] = useState('');
  const [currentSubscriber, setCurrentSubscriber] = useState(null) as any;

  const sectors = useSelector((state:AppState) => state.content && state.content.sectors);
    
  useEffect(() => {
    getSectorNames();
    setCurrentSubscriber(susbcriber)
  },[]);

  const AddTiffinLink = (props: any) => (
    <Link to={{pathname:"/operation/crm/add-tiffin", subscriber: { ...currentSubscriber } }}   {...props } />
  );

  const handleSectorChange = (event) => {
    setSector(event.target.value);
    
  }

  const renderSectors = () => {
    return(
       sectors && sectors.map( ( sector, index) => {
      return <MenuItem value={sector.messageValue} key = {index} selected = { true } > { sector.messageLabel }</MenuItem>
      })
    )
  }



  const buildSchedule = (susbcriber:SubscriptionSchedule) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250
        }
      }
    };

    const buildScheduleBody = (susbcriber:SubscriptionSchedule) =>{
        return susbcriber && susbcriber.optedSchedule &&
        Object.keys(susbcriber.optedSchedule).length > 0
        ? Object.keys(susbcriber.optedSchedule).map((day: any, index) => {
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {day}
              </TableCell>
              <TableCell align="right">
                <Select
                  name={day}
                  //@ts-ignore
                  value={
                    susbcriber.optedSchedule[day] ? susbcriber.optedSchedule[day] : ''
                  }
                  onChange={()=> console.log('Change')}
                  input={<Input id={day} />}
                  MenuProps={MenuProps}
                >
                  <MenuItem key="0" value="0">
                    No Thali
                  </MenuItem>
                  <MenuItem key="1" value="1">
                    1{' '}
                  </MenuItem>
                  <MenuItem key="2" value="2">
                    2{' '}
                  </MenuItem>
                  <MenuItem key="3" value="3">
                    3{' '}
                  </MenuItem>
                  <MenuItem key="4" value="4">
                    4{' '}
                  </MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          );
        })
      : null;
    };

    return(
      <div className = "SectorSubscriber-meal-schedule-container">
        <h6>Thali Schedule Details</h6>
        <Paper className="Margin-Container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day of Week</TableCell>
                <TableCell align="right">Number of thalis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{buildScheduleBody(susbcriber)}</TableBody>
          </Table>
        </Paper>
        {/* <Paper className="Margin-Container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rice Preference</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </Paper> */}
        <Paper className="Margin-Container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sector</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>  
                  <FormControl>
                    <Select
                      value={susbcriber.zone}
                      onChange={(event)=> handleSectorChange(event)}
                      MenuProps={MenuProps}
                    >
                    {sectors && renderSectors()}
                    </Select>
                  </FormControl>
                </TableCell>  
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Button 
            variant="contained"
            onClick = { ()=>console.log() }
          > 
            Change Thali Schedule/Sector/Preference
          </Button>
          
        <Divider/>
      </div>
    );
  };
  return (
            <React.Fragment>
              <div>
                { susbcriber && buildSchedule(susbcriber) }
              </div>  
              <div>
                <ListOverrideMealSchedule
                    overrideSchedules={susbcriber.overrideSchedules}
                    deleteOverrideScheduleFunc={deleteOverrideSchedule}
                    subscriberId={susbcriber.subscriberId}
                />
              </div>    
            </React.Fragment>
    )
}

export default requireAuth(connect(null, {getSectorNames, deleteOverrideSchedule})(SubcriberSchedule))
