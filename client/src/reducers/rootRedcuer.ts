import { combineReducers } from 'redux';
import authentication from './authentication';
import  apiError from './apiError';
import mealSchedule from './mealSchedule';
import profile from './profile';

export default combineReducers({
  authentication,
  mealSchedule,
  profile,
  apiError 
});