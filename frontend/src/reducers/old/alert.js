import { SET_ALERT, REMOVE_ALERT } from '../actions/type';

const initialState = [];

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]; //ingat kalau dlm btnuk array maka return bntuk array
    case REMOVE_ALERT:
      //ini update state dan direturn lagi
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}

/*
reducer mrupakan tmpat ubah state trima data dan action type data
dari actions nah awal2 ada initial state state awalmmu al 
disini dikasih kongo nilainya 
contoh initial state sudah ada nilai mis
const initialState = [
  {
    id:1,
    msg:'Please log in'
    alertype:'success'
  },
  {
    id:2,
    msg:'Please register'
    alertype:'failed'
  },
]
let payload = {id:3,msg:'helo',alerttype:'xxx'}
 const newState ={...initialState,payload}
maka new ssate skargn isinya 3 state ..
*/

/*
const mapStateToProps = (state) => ({
  alerts: state.alert, // sebalah kanan:state.alert adalah state dgn anma state yg ada direducers
  //yg sebelah kirir adalah nama varibale tuk tampung state tadi  di
  //component ini skrg
  alerts == >>> varibale state lokal yg dimasukin variabe dari state reducers
  state.alert adalah  state nama dari reducers

});

*/
