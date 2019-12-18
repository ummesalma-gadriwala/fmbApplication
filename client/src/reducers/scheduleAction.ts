import axios from 'axios';
import { GET_SCHEDULE_MONTHLY, 
         AUTH_ERROR,
         API_COMMUNICATION_DONE,
         API_COMMUNICATION_INPROGRESS,
         ADD_SCHEDULE_REVIEW,
         GET_SCHEDULE_REVIEW_FOR_USER, 
         DELETE_SCHEDULE_REVIEW,
         GET_SCHEDULE_REVIEW_FOR_USER_FOR_DATERANGE
        } from './actionType';
import { GET_SCHEDULLE_MONTH_ENDPOINT, 
         ADD_REVIEW, 
         GET_REVIEW_BY_USERID_SCHEDULEDATE,
         GET_REVIEW_BY_USERID_FOR_DATERANGE
       } from '../api/API';
import { Review } from '../type/Type';

export const getMonthsSchedule = (onErrorCallback: Function) => async (
  dispatch: Function
) => {
  try {
    dispatch({type: API_COMMUNICATION_INPROGRESS})
    const response = await axios.get(GET_SCHEDULLE_MONTH_ENDPOINT);
    dispatch({ type: GET_SCHEDULE_MONTHLY, payload: response.data });
    dispatch({type: API_COMMUNICATION_DONE})
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({type: API_COMMUNICATION_DONE})
    dispatch({ type: AUTH_ERROR, payload: 'Cannot Fetch Schedule' });
  }
};

export const addScheduleReviw = ( review:Review, onErrorCallback: Function) => async (
  dispatch: Function
) => {
    dispatch({type: API_COMMUNICATION_INPROGRESS})
    const response = await axios.post(ADD_REVIEW,review)
    response &&  dispatch({ type: ADD_SCHEDULE_REVIEW, payload: review });
    dispatch({type: API_COMMUNICATION_DONE})
  
};

export const getReviewForUserByDate = (username: string, scheduleDate: string , onErrorCallback: Function) => async (
  dispatch: Function) => {
  try{
  dispatch({type: API_COMMUNICATION_INPROGRESS})
  const response = await axios.get(GET_REVIEW_BY_USERID_SCHEDULEDATE(username,scheduleDate));
  dispatch({ type: GET_SCHEDULE_REVIEW_FOR_USER, payload: response.data });
  dispatch({type: API_COMMUNICATION_DONE})
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({type: API_COMMUNICATION_DONE})
    dispatch({ type: AUTH_ERROR, payload: 'Error Fetching getReviewForUserByDate' });
  }
};


export const getReviewForUserByDateRange = (username: string, fromDate: string, toDate: string , onErrorCallback: Function) => async (
  dispatch: Function) => {
  try{
  dispatch({type: API_COMMUNICATION_INPROGRESS})
  const response = await axios.get(GET_REVIEW_BY_USERID_FOR_DATERANGE(username,fromDate,toDate));
  dispatch({ type: GET_SCHEDULE_REVIEW_FOR_USER_FOR_DATERANGE, payload: response.data });
  dispatch({type: API_COMMUNICATION_DONE})
  } catch (e) {
    onErrorCallback && onErrorCallback();
    dispatch({type: API_COMMUNICATION_DONE})
    dispatch({ type: AUTH_ERROR, payload: 'Error Fetching getReviewForUserByDate' });
  }
};
