import { combineReducers } from 'redux';
import authentication from './authentication';
import  apiError from './apiError';
import mealSchedule from './mealSchedule';
import profile from './profile';
import {schedules} from './schedule';

export default combineReducers({
  authentication,
  mealSchedule,
  schedules,
  profile,
  apiError 
});
