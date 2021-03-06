import { combineReducers } from 'redux';
import alert from './alert';
export default combineReducers({
  alert, //nama alert ini yg kita pakai nanti utk diimport bukan nama alertReducer function dlm file alert.js
});
