import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../util/constant';
import { store } from '../store/store';
import { API_SERVER_ERROR, API_USER_ERROR, AUTH_USER } from '../reducers/actionType';
import { signout } from '../reducers/authenticationAction';


export default {
  setupInterceptors: (store, history) => {

    // Add a request interceptor
    axios.interceptors.request.use(
      function(config) {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        config.headers.Authorization = token;
        //console.log(config);
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        //console.log('response', response.headers);
        response.headers.Authorization &&
          localStorage.setItem(
            LOCAL_STORAGE_TOKEN,
            response.config.headers.Authorization
          );
        return response;
      },
      function(error) {
        // Do something with response error
        if (!error.response) {
          store.dispatch({ type: API_SERVER_ERROR });
        } else if (error.response.status.toString().startsWith('4')) {
          if (error.response.status === 401) {
            console.log('error 401', history);
            localStorage.removeItem(LOCAL_STORAGE_TOKEN);
            store.dispatch({ type: AUTH_USER, payload: '' });
            history.push('/logout');
            
          } else {
            store.dispatch({ type: API_USER_ERROR });
          }
        } else if (error.response.status.toString().startsWith('5')) {
          store.dispatch({ type: API_SERVER_ERROR });
        }
      }
    );
  }
}

export const createToken = (
  TOKEN_API_ENPOINT: any,
  formProps: Record<string, any>
) => axios.post(TOKEN_API_ENPOINT, formProps);
