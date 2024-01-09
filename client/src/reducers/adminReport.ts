import {
  OPERATIONS_GET_SECTORWISE_MEAL_COUNT,
  OPERATIONS_GET_SECTORWISE_MEAL_COUNT_V2
} from './actionType';
import { Operations } from '../type/Type';

const INITIAL_STATE: Operations = {
  reportDailyThaliCount: {
    selectedDate: null,
    sectorCounts: []
  }
};

export const reportDailyThaliCount = function(
  state = INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    case OPERATIONS_GET_SECTORWISE_MEAL_COUNT:
      return { ...action.payload };
    case OPERATIONS_GET_SECTORWISE_MEAL_COUNT_V2:
      return { ...action.payload };
    default:
      return state;
  }
};
