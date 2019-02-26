import { GET_SCHEDULE_MONTHLY } from './actionType';
import { ISchedule } from '../type/Type';

const INITIAL_STATE:any  = [];

export default function(state:any = INITIAL_STATE , action: any) {
  switch (action.type) {
    
    case GET_SCHEDULE_MONTHLY:
   //  console.log({state, action.payload});
     return[ ...state, ...action.payload];
     
    default:
      return state;
  }
}
 
