import { GET_SCHEDULE_MONTHLY } from './actionType';

const INITIAL_STATE: any = [];

export const schedules = function(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case GET_SCHEDULE_MONTHLY:
      return [...action.payload];
    default:
      return state;
  }
};
