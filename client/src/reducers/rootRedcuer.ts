import { combineReducers } from 'redux';
import authentication from './authentication';
import apiError from './apiError';
import mealSchedule from './mealSchedule';
import profile from './profile';
import { schedules } from './schedule';
import { isBusyCommunicating} from './busyCommuncating'
import {serviceWorkerUpdated } from './serviceWorker'
import { reportDailyThaliCount } from './adminReport'
import  crmOperation  from './crmOperation';
import content  from './content';
import { LOG_OUT } from './actionType';

export  const rootReducer = (state, action) => {
  if (action.type === LOG_OUT ) {
    state = undefined
  }
  return appReducer(state, action)
}

const appReducer = combineReducers({
  authentication,
  mealSchedule,
  schedules,
  profile,
  apiError,
  isBusyCommunicating,
  serviceWorkerUpdated,
  operations :  reportDailyThaliCount,
  content,
  crmOperation
})
