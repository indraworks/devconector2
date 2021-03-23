import { SET_ALERT, REMOVE_ALERT } from './type';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();

  //dispatch ada 2 yg disend action.type & payload
  dispatch({
    //yg didispatch hanya 2 yaitu type dan payload
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 4000);
  //setTimeOut buildin timer js yg intinya utk tunda 3s sblum send /dispatch payload:id
};

/*
kegunaan alert adalah mmebuat box warning pada ayer ui 
diatas from login/register jika terjadi suatu kesalahan status!==200
atau eror lainnya ditampilkan di atas form /ini alert universal bisa digunakan 
utk page2 lain jika ada erorr
action akan diimport di component dan dgn event maka action ini akan dilemapr ke reducer

nah reducer akan ubah state di store
stlahnya akan update state utk itu reducer statenya di import di cmponent yg lakukan action
utk tahu final state terbaru /update dari store
setelah ini kita akan buat component alert

jadi kegunaan component alert ini adalah utk page register
jadai gini pada saat kit aregister kita melakukan salah wrong validasi 
maka ini akan mmbuat action alert ,yaitu kit aimport 
component alert kita tampilkan di form register kmudian 
kita tunggu 5s utk remove alert pakai setInteval 
*/
