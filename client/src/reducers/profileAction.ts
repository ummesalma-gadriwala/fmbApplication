import axios from 'axios';
import {
  FETCH_USER_PROFILE,
  AUTH_ERROR,
  UPDATE_USER_PROFILE
} from './actionType';
import { TOKEN_API_ENPOINT, USER_PROFILE_ENDPOINT } from '../api/API';
import { Profile } from '../type/Type';

export const getUserProfile = (
  username: string,
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const response = await axios.get(USER_PROFILE_ENDPOINT(username));
    dispatch({ type: FETCH_USER_PROFILE, payload: response.data });
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Fetch User Profile' });
  }
};

export const updateUserProfile = (
  profile: Profile,
  workFlowProcessor: Function,
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const response = await axios.put(USER_PROFILE_ENDPOINT(null), profile);
    if (response && response.status === 200) {
      dispatch({ type: UPDATE_USER_PROFILE, payload: profile });
      workFlowProcessor && workFlowProcessor();
    }
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Update User Profile' });
  }
};
