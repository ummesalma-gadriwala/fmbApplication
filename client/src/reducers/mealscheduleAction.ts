import axios from 'axios';
import {
  GET_SUBSCRIBER_SCHEDULE,
  EDIT_SUBSCRIBER_SCHEDULE,
  ADD_SUBSCRIBER_OVERRIDESCHEDULE,
  GET_SUBSCRIBER_OVERRIDESCHEDULE,
  EDIT_SUBSCRIBER_OVERRIDESCHEDULE,
  DELETE_SUBSCRIBER_OVERRIDESCHEDULE,
  API_SERVER_ERROR,
  API_USER_ERROR
} from './actionType';
import {
  GET_THALI_SCHEDULE_ENDPOINT,
  UPDATE_THALI_SCHEDULE_ENDPOINT,
  DELETE_THALI_SCHEDULE_ENDPOINT
} from '../api/API';
import { SubscriptionSchedule, OverrideSchedule } from '../type/Type';
const dateFns = require('date-fns');

export const getSubscriptionSchedule = (
  subscriberId: string,
  workFlowProcessor: Function | null,
  onErrorCallback: Function | null
) => async (dispatch: Function) => {
  try {
    const response = await axios.get(GET_THALI_SCHEDULE_ENDPOINT(subscriberId));
    if (response && response.data) {
      const subscriptionSchedule: SubscriptionSchedule = response.data;
      dispatch({
        type: GET_SUBSCRIBER_SCHEDULE,
        payload: subscriptionSchedule.optedSchedule
      });
      if (
        subscriptionSchedule &&
        subscriptionSchedule.overrideSchedules &&
        subscriptionSchedule.overrideSchedules[0]
      ) {
        dispatch({
          type: GET_SUBSCRIBER_OVERRIDESCHEDULE,
          payload: subscriptionSchedule.overrideSchedules
        });
      }
    }
    workFlowProcessor &&
      workFlowProcessor(
        response.data.workFlowResponse &&
          response.data.workFlowResponse.goToRoute
      );
  } catch (err) {
    console.log(err);
    onErrorCallback && onErrorCallback();
    dispatch({ type: API_SERVER_ERROR });
  }
};

export const addOverrideSchedule = (
  subscriberId: string,
  overrideSchedule: OverrideSchedule,
  workFlowProcessor: Function,
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const addOverrideSchedule: OverrideSchedule = {...overrideSchedule};
    
    overrideSchedule.overrideStartDate = dateFns.format(
      overrideSchedule.overrideStartDate,
      'yyyy-MM-dd',
      { awareOfUnicodeTokens: true }
    );
    overrideSchedule.overrideEndDate = dateFns.format(
      overrideSchedule.overrideEndDate,
      'yyyy-MM-dd',
      { awareOfUnicodeTokens: true }
    );
    //@ts-ignore
    //addOverrideSchedule.overrideStartDate = `${addOverrideSchedule.overrideStartDate.getFullYear()}-${addOverrideSchedule.overrideStartDate.getMonth()+1}-${addOverrideSchedule.overrideStartDate.getDate()}`;
    //@ts-ignore
    //addOverrideSchedule.overrideEndDate= `${addOverrideSchedule.overrideEndDate.getFullYear()}-${ addOverrideSchedule.overrideEndDate.getMonth()+1}-${addOverrideSchedule.overrideEndDate.getDate()}`;
    const response = await axios.post(
      UPDATE_THALI_SCHEDULE_ENDPOINT(subscriberId),
      overrideSchedule
    );
    if (response && response.status === 201) {
      //const subscriptionSchedule: ISubscriptionSchedule = response.data;
      dispatch({
        type: ADD_SUBSCRIBER_OVERRIDESCHEDULE,
        payload: overrideSchedule
      });
      //getSubscriptionSchedule(subscriberId, null, null);
    }
    workFlowProcessor &&
      workFlowProcessor(
        response.data.workFlowResponse &&
          response.data.workFlowResponse.goToRoute
      );
  } catch (err) {
    onErrorCallback && onErrorCallback();
    console.log('err------>', err)
    if (err.response.status === 410) {
      dispatch({
        type: API_USER_ERROR,
        payload: 'Updated Schedule already exists'
      });
    } else {
      dispatch({ type: API_SERVER_ERROR });
    }
  }
};

export const deleteOverrideSchedule = (
  subscriberId: string,
  startDate: string,
  workFlowProcessor: Function,
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const response = await axios.delete(
      DELETE_THALI_SCHEDULE_ENDPOINT(subscriberId, startDate)
    );
    if (response && response.status === 200) {
      //const subscriptionSchedule: ISubscriptionSchedule = response.data;
      dispatch({
        type: DELETE_SUBSCRIBER_OVERRIDESCHEDULE,
        payload: startDate
      });
      //getSubscriptionSchedule(subscriberId, null, null);
    }
    workFlowProcessor &&
      workFlowProcessor(
        response.data.workFlowResponse &&
          response.data.workFlowResponse.goToRoute
      );
  } catch (err) {
    onErrorCallback && onErrorCallback();
    if (err.response.status === 410) {
      dispatch({ type: API_USER_ERROR, payload: 'Cannot Delete ' });
    } else {
      dispatch({ type: API_SERVER_ERROR });
    }
  }
};

// export const signout = () => {
//   localStorage.removeItem('token');
//   return {
//     type: AUTH_USER,
//     payload: ''
//   };
// };
