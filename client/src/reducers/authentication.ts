import { AUTH_USER, AUTH_ERROR } from './actionType';
import { LOCAL_STORAGE_TOKEN} from '../util/constant';


const INITIAL_STATE = {
  authenticated: localStorage.getItem(LOCAL_STORAGE_TOKEN) ? localStorage.getItem(LOCAL_STORAGE_TOKEN) : '' ,
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
 
