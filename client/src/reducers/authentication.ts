import { AUTH_USER, AUTH_ERROR } from './actionType';
import { LOCAL_STORAGE_TOKEN} from '../util/constant';
import { IAuthentication, IToken } from '../type/Type';
import jwt from 'jsonwebtoken';


const INITIAL_STATE:IAuthentication  = {
  authenticated: localStorage.getItem(LOCAL_STORAGE_TOKEN) ? localStorage.getItem(LOCAL_STORAGE_TOKEN) : '' ,
  errorMessage: '',
  decodedToken : {
    //@ts-ignore
    subscriberId:localStorage.getItem(LOCAL_STORAGE_TOKEN) ? jwt.decode(localStorage.getItem(LOCAL_STORAGE_TOKEN)).subscriberId : null,
    //@ts-ignore
    username:localStorage.getItem(LOCAL_STORAGE_TOKEN) ? jwt.decode(localStorage.getItem(LOCAL_STORAGE_TOKEN)).subscriberId : null
  }
};

export default function(state:IAuthentication = INITIAL_STATE, action: any) {
  switch (action.type) {
    case AUTH_USER:
      //@ts-ignore
      const subscriberId =action? action.payload ? jwt.decode(action.payload) ? jwt.decode(action.payload).subscriberId : null: null : null ;
      //@ts-ignore
      const username =action? action.payload ? jwt.decode(action.payload) ? jwt.decode(action.payload).username : null: null : null ;
      return { ...state, authenticated: action.payload, decodedToken :{ subscriberId, username }};
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
 
