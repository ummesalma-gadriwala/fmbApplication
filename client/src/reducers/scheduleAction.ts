import axios from 'axios';
import { GET_SCHEDULE_MONTHLY, AUTH_ERROR, API_COMMUNICATION_DONE, API_COMMUNICATION_INPROGRESS } from './actionType';
import { GET_SCHEDULLE_MONTH_ENDPOINT } from '../api/API';
import { store } from '../store/store';

export const getMonthsSchedule = (onErrorCallback: Function) => async (
  dispatch: Function
) => {
  try {
    dispatch({type: API_COMMUNICATION_INPROGRESS})
    const response = await axios.get(GET_SCHEDULLE_MONTH_ENDPOINT);
    dispatch({ type: GET_SCHEDULE_MONTHLY, payload: response.data });
    dispatch({type: API_COMMUNICATION_DONE})
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({type: API_COMMUNICATION_DONE})
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Fetch Schedule' });
  }
};
