import { SET_ALERT, REMOVE_ALERT } from './type';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch(
    //isi disptach adalah .type dan payload yg dikirimakan ke reducers
    {
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
      },
    }
  );
  //buat set time out stlah 5000 baru dispatch REMOVE_ALERT
  setTimeout(() => dispatch({type:REMOVE_ALERT,payload:id}),5000)

};
/*

note kita akkan dispatch remove_alert stalh waktu tertentu 
jadi pas 5 detik kirim disptach ke reducer nah ilangkan state ini :
dgn cara filter 
return state.filter((alert) => alert.id !== action.payload);
id.alert yg sblumnya kan sudah dicreate awajtu acation nah dibandingkan dgn id yg skrg


*/
