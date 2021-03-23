import { SET_ALERT, REMOVE_ALERT } from '../actions/type';

const initialState = []; //allert alarm dalam array

export default function alertReducers(state = initialState, action) {
  
  
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERT:
      //ingat isi state adalah object {id,msg,alertType}
      //nah yg di looping adalah id yg tidak dipilih/di remove
      //jadai difilter yg id sekrg tidak sama dgn yg skrg
      return state.filter((alert) => alert.id !== action.payload);

    default:
      return state;
  }
}

/*

tahap reducer :
mmbuat file index.js
-isinya index.js mrupakan combiner smua file reducer dlm hal ini pertama kita mmbuat
file alert.js utk mmeberi error 
-kmduian memilay rtype dari action ,dgn swicth piliha utk type tadi
-dgn retrun hasil kembalian ke store melalui provider.app.js supata terhubung dgn component
 -stlahnya lakukan import action ,di component 
 -propsnya di destruction
 -buat typeProps ,utk props yg masuk di component
 -buat mapsttetoporpya utk state yg masukan kedalam variable local state dari reducer
  jika meman ada state
 -buat conect di bagian bawah dgn component masukan action yg diimport dari action 



*/
