import {
  UPDATE_SERVICEWORKER
} from './actionType';

const INITIAL_STATE: boolean = false;

export const serviceWorkerUpdated = function(state: boolean = INITIAL_STATE, action: any) {
  switch (action.type) {
    case UPDATE_SERVICEWORKER:
      return true
    default:
      return state;
  }
}

export function updateServiceworker () {
  return {
    type: UPDATE_SERVICEWORKER
  }
}
