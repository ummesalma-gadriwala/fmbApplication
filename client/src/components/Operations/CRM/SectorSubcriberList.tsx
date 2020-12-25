import './SectorSubscriberList.css'
import React, { useEffect, useState } from 'react';
import requireAuth from '../../../requireAuth';
import { connect, useDispatch, useSelector } from 'react-redux';
import {getAllSubscriberInfo} from '../../../reducers/crmOperationAction';
import {getSectorNames} from '../../../reducers/contentAction';
import {deleteOverrideSchedule} from '../../../reducers/mealscheduleAction';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { AppState, SubscriptionSchedule } from '../../../type/Type';
import InputLabel from '@material-ui/core/InputLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import ListOverrideMealSchedule from '../../MealSchedule/ListOverrideMealSchedule';

const SectorSubcriberList =  ({getAllSubscriberInfo , getSectorNames, deleteOverrideSchedule}) => {
  const [sector, setSector] = useState('');
  const [currentSubscriber, setCurrentSubscriber] = useState(null) as any;

  const subscriberList = useSelector((state:AppState) => state.crmOperation && state.crmOperation.subscribers);
  const sectors = useSelector((state:AppState) => state.content && state.content.sectors);
    
  useEffect(() => {
    getAllSubscriberInfo();
    getSectorNames();
  },[]);

  const AddTiffinLink = (props: any) => (
    <Link to={{pathname:"/operation/crm/add-tiffin", subscriber: { ...currentSubscriber } }}   {...props } />
  );

  const handleChange = (event) => {
    setSector(event.target.value);
    renderSubscriber(subscriberList,event.target.value);
  }

  const renderSectors = () => {
    return(
       sectors && sectors.map( ( sector, index) => {
      return <MenuItem value={sector.messageValue} key = {index} selected = { true } > { sector.messageLabel }</MenuItem>
      })
    )
  }

  const renderSubscriber = (subscriberList:Array<SubscriptionSchedule>|null, sectorName:string) => {
    return (
     subscriberList && subscriberList.filter( (susbcriber:SubscriptionSchedule) => susbcriber && susbcriber.user && susbcriber.zone === sectorName ).map((susbcriber, index) => {
      return (
      <ExpansionPanel key = { index }>  
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
            onClick = { ()=> {
                               console.log('subscriberId', susbcriber.subscriberId);
                               setCurrentSubscriber(susbcriber);
                          }
                      }
            >
           <div>
              <Typography variant="button" display="block" >{ susbcriber &&  susbcriber.user &&`${susbcriber.user.firstName}  ${susbcriber.user.lastName}`  }</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
             <div>
              <Typography variant="button" display="block">{ susbcriber && ` ${susbcriber.subscriberId}`  }</Typography>
              <Typography variant="overline" display="block">{ susbcriber && susbcriber.user && `${susbcriber.user.primaryAddress.streetName}`  }</Typography>
              <Typography variant="overline" display="block">{ susbcriber &&
                            `${susbcriber.user && susbcriber.user.primaryAddress.city} - 
                             ${susbcriber.user &&  susbcriber.user.primaryAddress.province}-
                             ${susbcriber.user &&  susbcriber.user.primaryAddress.country} `
                          }
              </Typography>
              <Typography variant="overline" display="block">{ susbcriber && susbcriber.user && `${susbcriber.user.primaryAddress.postalCode}`  }</Typography>
             </div>
             <div>
              <ListOverrideMealSchedule
                  overrideSchedules={susbcriber.overrideSchedules}
                  deleteOverrideScheduleFunc={deleteOverrideSchedule}
                  subscriberId={susbcriber.subscriberId}
              />
             </div>    
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button 
              variant="contained"
              component={AddTiffinLink}
              onClick = { ()=>console.log() }
            > 
              Add/Cancel Thali
            </Button>
           
          </ExpansionPanelActions>
        </ExpansionPanel>)
     }))
  }

  return(
    <div>
      <div className="SectorSubscriber-Sector-container">
        <Card className="Card-container">
          <CardContent>
            <FormControl>
              <InputLabel id="sector-select-label">Sector</InputLabel>
              <Select
                labelId="sector-select-label"
                id="sector-select-label"
                value={sector}
                onChange={handleChange}
              >
              {sectors && renderSectors()}
              </Select>
            </FormControl>  
          </CardContent>
        </Card>
      </div>
      <div>
        { subscriberList && renderSubscriber(subscriberList,sector) } 
      </div>  
    </div>  
  );
}

// const mapStateToProps = (state: AppState) => {
//   console.log('mapstateToProps', state && state.crmOperation&& state.crmOperation.subscribers && state.crmOperation.subscribers.find(subscriber => subscriber.subscriberId === '60437431'))
//   return ({
//     sectors : state.content && state.content.sectors,
//     //subscriberList: state.crmOperation && state.crmOperation.subscribers
//   });
// };

export default requireAuth(connect(null, {getAllSubscriberInfo, getSectorNames, deleteOverrideSchedule})(SectorSubcriberList))
