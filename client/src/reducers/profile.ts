import { FETCH_USER_PROFILE } from './actionType';
import { IProfile, IToken } from '../type/Type';

const INITIAL_STATE:any  = {};

export default function(state:IProfile = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return { ...state,  ...action.payload};
    default:
      return state;
  }
}
 
