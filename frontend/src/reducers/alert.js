import { SET_ALERT, REMOVE_ALERT } from '../actions/type';

const initialState = [];

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
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


*/
