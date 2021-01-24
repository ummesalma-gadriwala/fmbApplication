import axios from 'axios';
import {
  OPERATIONS_GET_SECTORWISE_MEAL_COUNT,
  API_SERVER_ERROR,
  API_COMMUNICATION_DONE, 
  API_COMMUNICATION_INPROGRESS
} from './actionType';
import {
  GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT
} from '../api/API';
import { SectorCount} from '../type/Type';

const dateFns = require('date-fns');


export const getMealCountBySectorForSelectedDate = (
  selectedDate: string,
  onErrorCallback: Function | null
) => async (dispatch: Function) => {
  try {
    dispatch({type: API_COMMUNICATION_INPROGRESS})
    const response = await axios.get(GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT(selectedDate));
    if (response && response.data) {
      const sectorCounts: SectorCount [] = response.data;
      dispatch({
        type: OPERATIONS_GET_SECTORWISE_MEAL_COUNT,
        payload: {reportDailyThaliCount: { selectedDate, sectorCounts }} 
      });
    }
    dispatch({type: API_COMMUNICATION_DONE})
  } catch (err) {
    dispatch({type: API_COMMUNICATION_DONE})
    onErrorCallback && onErrorCallback();
    dispatch({ type: API_SERVER_ERROR });
  }
};