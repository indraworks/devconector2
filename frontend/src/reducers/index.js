import { combineReducers } from 'redux';
import alertReducers from './alert';
import profileReducers from './profile';
import auth from './auth';

export default combineReducers({
  alertReducers,
  auth,
  profileReducers,
});
