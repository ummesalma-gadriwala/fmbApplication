import axios from 'axios';
import { GET_SCHEDULE_MONTHLY, AUTH_ERROR } from './actionType';
import { GET_SCHEDULLE_MONTH_ENDPOINT } from '../api/API';
import { store } from '../store/store';

export const getMonthsSchedule = (onErrorCallback: Function) => async (
  dispatch: Function
) => {
  try {
    const response = await axios.get(GET_SCHEDULLE_MONTH_ENDPOINT);
    dispatch({ type: GET_SCHEDULE_MONTHLY, payload: response.data });
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Fetch Schedule' });
  }
};
