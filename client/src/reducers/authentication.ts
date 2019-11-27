import { AUTH_USER, AUTH_ERROR } from './actionType';
import { LOCAL_STORAGE_TOKEN} from '../util/constant';
import { Authentication, Token } from '../type/Type';
import jwt from 'jsonwebtoken';

function getEmptyToken() {
  return {
    subscriberId: null,
    username: null,
    roles: [],
    scopes: []
  } as Token;
}

function getToken(tokenString: string | null = null) {
  if (!tokenString) {
    tokenString = localStorage.getItem(LOCAL_STORAGE_TOKEN);
  }
  if (tokenString) {
    const tokenObj = jwt.decode(tokenString) as Token;
    // The object in local storage or the token is a commma separate string,
    // not an array. We should force it to a string and split it.
    tokenObj.roles = (tokenObj.roles as any as string).split(",");
    tokenObj.scopes = (tokenObj.scopes as any as string).split(",");
    return tokenObj;
  }

  return getEmptyToken();
}

const INITIAL_STATE:Authentication  = {
  authenticated: localStorage.getItem(LOCAL_STORAGE_TOKEN) ? localStorage.getItem(LOCAL_STORAGE_TOKEN) : '' ,
  errorMessage: '',
  decodedToken : getToken()
};

export default function(state:Authentication = INITIAL_STATE, action: any) {
  switch (action.type) { 
    case AUTH_USER:
      if (action.payload) {
        const decodedToken = getToken(action.payload);
        return { ...state, authenticated: action.payload, decodedToken: decodedToken} as Authentication;
      }
      return { ...state, authenticated: action.payload, decodedToken : getEmptyToken()} as Authentication;
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload } as Authentication;
    default:
      return state;
  }
}
 
