import { combineReducers } from 'redux';
import authentication from './authentication';
import  apiError from './apiError';
import mealSchedule from './mealSchedule';

export default combineReducers({
  authentication,
  mealSchedule,
  apiError 
});