import axios from 'axios';
import { FETCH_USER_PROFILE, AUTH_ERROR } from './actionType';
import { TOKEN_API_ENPOINT, USER_PROFILE_ENDPOINT} from '../api/API';

export const getUserProfile = (username:string,  onErrorCallback: Function ) => async (dispatch:Function) => {
  try {
    const response = await axios.get(USER_PROFILE_ENDPOINT(username));
    dispatch({ type: FETCH_USER_PROFILE, payload: response.data });
    //console.log('userResponse---->', response);
    
  } catch (e) {
    onErrorCallback && onErrorCallback(); 
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Fetch User Profile' });
  }
};
