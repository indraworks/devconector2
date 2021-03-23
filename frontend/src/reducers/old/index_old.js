import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
export default combineReducers({
  alert, //nama alert ini yg kita pakai nanti utk diconect waktu mau masukin di variable local component
  // bukan nama alertReducer function dlm file alert.js dibagian mapStateToProps ={ va lokal :state.alert}
  auth, //nama auth adalah nama state  dari state,auth  utk dimasukan kdalam var lokal  mapStataeToProps ={var lokal:state.auth}
});

//contoh
/*
const mapStateToProps = (state) => ({
  alerts: state.alert, // sebalah kanan:state.alert adalah state dgn anma state yg ada direducers
  //yg sebelah kirir adalah nama varibale tuk tampung state tadi  di
  //component ini skrg
  alerts == >>> varibale state lokal yg dimasukin variabe dari state reducers
  state.alert adalah  state nama dari reducers

});

*/
