import axios from 'axios';
import {GET_ALL_SUBSCRIBERINFO } from '../api/API';
import { API_SERVER_ERROR, CRM_OPERATIONS_GET_SUBSCRIBERS } from './actionType';

export const getAllSubscriberInfo = (  
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const subscribers = await axios.get(GET_ALL_SUBSCRIBERINFO());
    dispatch({ type: CRM_OPERATIONS_GET_SUBSCRIBERS,  payload: subscribers.data });
  } catch (e) {
    console.log(e);
    onErrorCallback();
    dispatch({ type: API_SERVER_ERROR, payload: 'getSubscriberInfo' });
  }
};
