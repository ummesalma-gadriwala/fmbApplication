import { FETCH_USER_PROFILE } from './actionType';
import { Profile } from '../type/Type';

const INITIAL_STATE:any  = {};

export default function(state:Profile = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      console.log(action)
      return { ...state,  ...action.payload};
    default:
      return state;
  }
}
 
