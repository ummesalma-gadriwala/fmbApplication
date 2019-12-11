import axios from 'axios';
import {
  OPERATIONS_GET_SECTORWISE_MEAL_COUNT,
  API_SERVER_ERROR
} from './actionType';
import {
  GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT
} from '../api/API';
import { SectorCount, SectorCountSelectedDate} from '../type/Type';

const dateFns = require('date-fns');


export const getMealCountBySectorForSelectedDate = (
  selectedDate: string,
  onErrorCallback: Function | null
) => async (dispatch: Function) => {
  try {
    const response = await axios.get(GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT(selectedDate));
    if (response && response.data) {
      const sectorCounts: SectorCount [] = response.data;
      dispatch({
        type: OPERATIONS_GET_SECTORWISE_MEAL_COUNT,
        payload: {reportDailyThaliCount: { selectedDate, sectorCounts }} 
      });
    }
  } catch (err) {
    console.log(err);
    onErrorCallback && onErrorCallback();
    dispatch({ type: API_SERVER_ERROR });
  }
};