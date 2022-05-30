/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import './SectorSubscriberList.css';
import React, { useEffect, useState } from 'react';
import requireAuth from '../../../requireAuth';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAllSubscriberInfo } from '../../../reducers/crmOperationAction';
import { getSectorNames } from '../../../reducers/contentAction';
import {
  deleteOverrideSchedule,
  updateSubscriptionSchedule
} from '../../../reducers/mealscheduleAction';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  AppState,
  PackageColor,
  SubscriptionSchedule,
  TiffinPersonalization
} from '../../../type/Type';
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
import {
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { workFlowRouteProcessor } from '../../../util/workFlowProcessor';
import Spinner from '../../Spinner/Spinner';

const SectorSubcriberList = ({
  history,
  getAllSubscriberInfo,
  getSectorNames,
  deleteOverrideSchedule
}) => {
  const [sector, setSector] = useState('');
  const [currentSubscriber, setCurrentSubscriber] = useState(null) as any;
  const [
    newSubscriptionScheudle,
    setNewSubscriptionScheudle
  ] = useState<SubscriptionSchedule | null>();
  const [isBusy, setIsBusy] = useState(false);

  const subscriberList = useSelector(
    (state: AppState) => state.crmOperation && state.crmOperation.subscribers
  );
  const sectors = useSelector(
    (state: AppState) => state.content && state.content.sectors
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getAllSubscriberInfo();
    getSectorNames();
  }, []);

  const AddTiffinLink = (props: any) => (
    <Link
      to={{
        pathname: '/operation/crm/add-tiffin',
        subscriber: { ...currentSubscriber }
      }}
      {...props}
    />
  );

  const handleChange = event => {
    setSector(event.target.value);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    renderSubscriber(subscriberList, event.target.value);
  };

  const renderSectors = () => {
    return (
      sectors &&
      sectors.map((sector, index) => {
        return (
          <MenuItem value={sector.messageValue} key={index} selected={true}>
            {' '}
            {sector.messageLabel}
          </MenuItem>
        );
      })
    );
  };

  const renderSubscriber = (
    subscriberList: Array<SubscriptionSchedule> | null,
    sectorName: string
  ) => {
    const extractPackageColor = (
      personalization: TiffinPersonalization | null
    ) => {
      let selectedPackagePreference: string = PackageColor[PackageColor.Grey];

      selectedPackagePreference =
        personalization !== null &&
        personalization.noRice &&
        personalization.noRice.activate === true
          ? (selectedPackagePreference = PackageColor[PackageColor.White])
          : selectedPackagePreference;
      return selectedPackagePreference;
    };
    const buildSchedule = (susbcriber: SubscriptionSchedule) => {
      const currentSubscriptionSchedule: SubscriptionSchedule = Object.assign(
        {},
        newSubscriptionScheudle &&
          newSubscriptionScheudle.subscriberId === susbcriber.subscriberId
          ? newSubscriptionScheudle
          : susbcriber
      );
      const handleSubscriptionDayCountChange = event => {
        const target = event.target;
        const value = target.value;
        const name: string = target.name;
        const changedKey = Object.keys(
          currentSubscriptionSchedule.optedSchedule
        ).find(key => key === name);
        if (changedKey) {
          currentSubscriptionSchedule.optedSchedule[changedKey] = value;
        }
        setNewSubscriptionScheudle(currentSubscriptionSchedule);
      };

      const handleSubscriptionSectorChange = event => {
        const target = event.target;
        const value = target.value;
        currentSubscriptionSchedule.zone = value;
        setNewSubscriptionScheudle(currentSubscriptionSchedule);
      };

      const handlePacakgeColorChange = event => {
        const target = event.target;
        const value = target.value;
        const updatedSchedule = Object.assign({}, currentSubscriptionSchedule);
        if (
          updatedSchedule &&
          updatedSchedule.personalization &&
          updatedSchedule.personalization.noRice
        ) {
          updatedSchedule.personalization.noRice.activate = value === PackageColor.White ? true : false;
          setNewSubscriptionScheudle(updatedSchedule);
        }
        console.log(
          'handlePacakgeColorChange------------>',
          newSubscriptionScheudle
        );
      };

      const renderSectorsBySelectedSetor = (selectedSector: string) => {
        return (
          sectors &&
          sectors.map((sector, index) => {
            return (
              <MenuItem
                value={sector.messageValue}
                key={index}
                selected={selectedSector === sector.messageValue ? true : false}
              >
                {' '}
                {sector.messageLabel}
              </MenuItem>
            );
          })
        );
      };

      const renderPackageColorBySelectedPackage = (
        personalization: TiffinPersonalization | null
      ) => {
        const selectedPackagePreference: string = extractPackageColor(
          personalization
        );
        return Object.keys(PackageColor).map((packageColor, index) => {
          return (
            <MenuItem
              value={packageColor}
              key={index}
              selected={
                selectedPackagePreference === packageColor ? true : false
              }
            >
              {' '}
              {packageColor}
            </MenuItem>
          );
        });
      };

      const changeSubscriptionSchedule = () => {
        setIsBusy(true);
        newSubscriptionScheudle &&
          dispatch(
            updateSubscriptionSchedule(
              newSubscriptionScheudle,
              (workFlowRoute: string) => {
                workFlowRouteProcessor(
                  history,
                  '/operation/crm-dashboard',
                  workFlowRoute
                );
              },
              () => setIsBusy(false)
            )
          );
        setIsBusy(false);
      };
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

      const buildScheduleBody = (susbcriber: SubscriptionSchedule) => {
        return susbcriber &&
          susbcriber.optedSchedule &&
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
                      value={
                        susbcriber.optedSchedule[day] ||
                        susbcriber.optedSchedule[day] === 0
                          ? susbcriber.optedSchedule[day]
                          : ''
                      }
                      onChange={event =>
                        handleSubscriptionDayCountChange(event)
                      }
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

      return (
        <Spinner active={isBusy}>
          <div className="SectorSubscriber-meal-schedule-container">
            <h6>Thali Schedule Details</h6>
            <Paper className="Margin-Container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day of Week</TableCell>
                    <TableCell align="right">Number of thalis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buildScheduleBody(currentSubscriptionSchedule)}
                </TableBody>
              </Table>
            </Paper>
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
                          value={currentSubscriptionSchedule.zone}
                          onChange={event =>
                            handleSubscriptionSectorChange(event)
                          }
                          MenuProps={MenuProps}
                        >
                          {sectors &&
                            renderSectorsBySelectedSetor(
                              currentSubscriptionSchedule.zone
                            )}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
             <Paper className="Margin-Container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pacakge Color</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={extractPackageColor(
                            currentSubscriptionSchedule.personalization)
                          }
                          onChange={event => handlePacakgeColorChange(event)}
                          MenuProps={MenuProps}
                        >
                          {renderPackageColorBySelectedPackage(
                            currentSubscriptionSchedule.personalization
                          )}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
            <Button
              variant="contained"
              onClick={() => changeSubscriptionSchedule()}
            >
              Change Thali Schedule/Sector/Preference
            </Button>

            <Divider />
          </div>
        </Spinner>
      );
    };
    return (
      subscriberList &&
      subscriberList
        .filter(
          (susbcriber: SubscriptionSchedule) =>
            susbcriber && susbcriber.user && susbcriber.zone === sectorName
        )
        .map((susbcriber, index) => {
          return (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
                onClick={() => {
                  setCurrentSubscriber(susbcriber);
                }}
              >
                <div>
                  <Typography variant="button" display="block">
                    {susbcriber &&
                      susbcriber.user &&
                      `${susbcriber.user.firstName}  ${susbcriber.user.lastName} (${susbcriber.subscriberId})`}
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div>
                  <div>
                    <Typography variant="overline" display="block">
                      {susbcriber &&
                        susbcriber.user &&
                        `${susbcriber.user.primaryAddress.streetName}`}
                    </Typography>
                    <Typography variant="overline" display="block">
                      {susbcriber &&
                        `${susbcriber.user &&
                          susbcriber.user.primaryAddress.city} - 
                             ${susbcriber.user &&
                               susbcriber.user.primaryAddress.province}-
                             ${susbcriber.user &&
                               susbcriber.user.primaryAddress.country} `}
                    </Typography>
                    <Typography variant="overline" display="block">
                      {susbcriber &&
                        susbcriber.user &&
                        `${susbcriber.user.primaryAddress.postalCode}`}
                    </Typography>
                  </div>
                  <div>{susbcriber && buildSchedule(susbcriber)}</div>
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
                  onClick={() => console.log()}
                >
                  Add/Cancel Thali
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })
    );
  };

  return (
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
      <div>{subscriberList && renderSubscriber(subscriberList, sector)}</div>
    </div>
  );
};

export default requireAuth(
  connect(null, {
    getAllSubscriberInfo,
    getSectorNames,
    deleteOverrideSchedule
  })(SectorSubcriberList)
);
