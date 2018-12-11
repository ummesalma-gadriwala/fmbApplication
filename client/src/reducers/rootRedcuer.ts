import { combineReducers } from 'redux';
import authentication from './authentication';
import  apiError from './apiError';

export default combineReducers({
  authentication,
  apiError 
});