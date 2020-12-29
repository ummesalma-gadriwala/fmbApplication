import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, LOG_OUT } from './actionType';
import { TOKEN_API_ENPOINT, USER_PROFILE_ENDPOINT } from '../api/API';
import { LOCAL_STORAGE_TOKEN } from '../util/constant';
import { createToken } from '../api/axiosInterceptor';
import jwt from 'jsonwebtoken';
import { Token } from '../type/Type';

// export const signup = (formProps:object, callback:Function) => async (dispatch:Function) => {
//   try {
//     const response = await axios.post(
//       'http://localhost:3090/signup',
//       formProps
//     );

//     dispatch({ type: AUTH_USER, payload: response.data.token });
//     localStorage.setItem('token', response.data.token);
//     callback();
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
//   }
// };

export const signin = (
  formProps: object,
  workFlowProcessor: Function,
  onErrorCallback: Function
) => async (dispatch: Function) => {
  try {
    const response = await createToken(TOKEN_API_ENPOINT, formProps);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.token);
    workFlowProcessor(
      response.data.workFlowResponse && response.data.workFlowResponse.goToRoute
    );
    const decodeToken = jwt.decode(response.data.token) as Token;
    const userResponse = await axios.get(
      USER_PROFILE_ENDPOINT(decodeToken.username)
    );
    //console.log('userResponse---->', userResponse);
  } catch (e) {
    onErrorCallback();
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = (workFlowProcessor: Function, onErrorCallback: Function| null) => async (dispatch: Function) => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  workFlowProcessor && workFlowProcessor();
  dispatch({ type: LOG_OUT,  payload: null });

};
