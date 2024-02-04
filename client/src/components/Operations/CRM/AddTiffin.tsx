/* eslint-disable linebreak-style */
import './AddTiffin.css';
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';

import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {
  AppState,
  OverrideSchedule,
  SubscriptionSchedule
} from '../../../type/Type';
import { addOverrideSchedule } from '../../../reducers/mealscheduleAction';
import { useDispatch, useSelector } from 'react-redux';
import { workFlowRouteProcessor } from '../../../util/workFlowProcessor';
import { Alert } from 'reactstrap';

const dateFns = require('date-fns');

const AddTiffin = props => {
  const subscriber: SubscriptionSchedule =
    props && props.location && props.location.subscriber;
  const apiError = useSelector((state: AppState) => state.apiError);

  const [overrideEndDate, setOverrideEndDate] = useState(
    dateFns.addDays(new Date(), 2)
  );
  const [overrideStartDate, setOverrideStartDate] = useState(
    dateFns.addDays(new Date(), 1)
  );
  const [overrideCount, setOverrideCount] = useState('') as any;
  const [errorState, setErrorState] = useState(undefined) as any;

  const [isValid, setIsValid] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [
    newPlanOverride,
    setNewPlanOverride
  ] = useState<OverrideSchedule | null>({
    overrideStartDate,
    overrideEndDate,
    weeklyOverrideSchedule: {
      MONDAY: null,
      TUESDAY: null,
      WEDNESDAY: null,
      THURSDAY: null,
      FRIDAY: null
    }
  });
  const dispatch = useDispatch();

  const validateAndOverride = () => {
    setErrorState(undefined);
    let isValidDate: boolean =
      dateFns.differenceInHours(overrideEndDate, overrideStartDate) >= 0;
    if (
      isValidDate &&
      subscriber &&
      subscriber.overrideSchedules &&
      subscriber.overrideSchedules.length > 0
    ) {
      const overlapDate = subscriber.overrideSchedules.find(
        overrideSchedule =>
          dateFns.isWithinInterval(overrideStartDate, {
            start: new Date(overrideSchedule.overrideStartDate),
            end: new Date(overrideSchedule.overrideEndDate)
          }) ||
          dateFns.isWithinInterval(overrideEndDate, {
            start: new Date(overrideSchedule.overrideStartDate),
            end: new Date(overrideSchedule.overrideEndDate)
          })
      );
      isValidDate = overlapDate ? false : true;
      setErrorState('Success');
    }
    setIsValid(() => isValidDate);
    if (isValidDate) {
      setIsBusy(true);
      const overridePlan: OverrideSchedule = Object.assign({}, newPlanOverride);
      overridePlan.weeklyOverrideSchedule.MONDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.TUESDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.WEDNESDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.THURSDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.FRIDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.SATURDAY = overrideCount;
      overridePlan.weeklyOverrideSchedule.SUNDAY = overrideCount;
      overridePlan.overrideStartDate = overrideStartDate;
      overridePlan.overrideEndDate = overrideEndDate;
      setNewPlanOverride(overridePlan);
      return (
        subscriber.subscriberId &&
        dispatch(
          addOverrideSchedule(
            subscriber.subscriberId,
            overridePlan,
            (workFlowRoute: string) => {
              workFlowRouteProcessor(
                props.history,
                '/operation/crm-dashboard',
                workFlowRoute
              );
            },
            () => setIsBusy(false)
          )
        )
      );
    } else {
      setErrorState('Please Validate Date It can be due to overlapping dates');
      return;
    }
  };

  return (
    <div className="CRMDashboard-AddTiffin-container">
      {errorState && <Alert color="warning">{errorState}</Alert>}
      <Alert color="info">
        <ul>
          <li>To Cancel Thali select Zero for the duration.</li>
          <li>
            For Thali count change select count that would be actually delivered
            for selected duration.
          </li>
        </ul>
      </Alert>
      <h6>Add/Cancel Thali</h6>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          minDate={dateFns.addDays(new Date(), 1)}
          maxDate={dateFns.addMonths(new Date(), 1)}
          margin="normal"
          label="From Date"
          value={overrideStartDate}
          onChange={value => setOverrideStartDate(value)}
          id="date-picker-add-tiffin-start-date"
        />
        <DatePicker
          minDate={dateFns.addDays(new Date(), 1)}
          maxDate={dateFns.addMonths(new Date(), 1)}
          margin="normal"
          label="To Date"
          value={overrideEndDate}
          onChange={value => setOverrideEndDate(value)}
          id="date-picker-add-tiffin-end-date"
        />
      </MuiPickersUtilsProvider>
      <FormControl>
        <InputLabel id="demo-simple-select-outlined-label">
          Number of Thalis Requested
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={overrideCount}
          onChange={event => setOverrideCount(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
      {/* <TextField id="outlined-basic" label="Number of Thalis during this period" variant="outlined" type="number" size="small"/>   */}

      <div className="Margin-Container">
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="secondary"
          //@ts-ignore
          onClick={() => validateAndOverride()}
        >
          Add/Cancel Thali
        </Button>
      </div>
    </div>
  );
};

export default AddTiffin;
