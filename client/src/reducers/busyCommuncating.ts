import {
  API_COMMUNICATION_DONE,
  API_COMMUNICATION_INPROGRESS
} from './actionType';

const INITIAL_STATE: boolean = false;

export const isBusyCommunicating = function(state: boolean = INITIAL_STATE, action: any) {
  switch (action.type) {
    case API_COMMUNICATION_DONE:
      return false
    case API_COMMUNICATION_INPROGRESS:
      return true  
    default:
      return state;
  }
}
