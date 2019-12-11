import {
  OPERATIONS_GET_SECTORWISE_MEAL_COUNT
  
  
} from './actionType';
import { SubscriptionSchedule, OverrideSchedule, Operations } from '../type/Type';
import { GET_MEAL_COUNT_SECTORWISE_DAILY_ENDPOINT } from '../api/API';

const INITIAL_STATE: Operations = {
  reportDailyThaliCount:{
    selectedDate:null,
    sectorCounts:[]
  }
};

export const reportDailyThaliCount= function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case OPERATIONS_GET_SECTORWISE_MEAL_COUNT:
      return {  ...action.payload };
    default:
      return state;
  }
}
