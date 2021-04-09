import { combineReducers } from 'redux';
import alertReducers from './alert';
import profileReducers from './profile';
import auth from './auth';
import post from './post';

export default combineReducers({
  alertReducers,
  auth,
  profileReducers,
  post
});
