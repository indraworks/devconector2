//auth reducer berisi autentikasi untuk registrasi dan login
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/type';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state, //dispreate state
        ...action.payload, //dispreated payload
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case ACCOUNT_DELETED:
    case LOGOUT: //logout sama token nul isauth false,
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
/*
jadi gini tentang loading atau loader ini setiap user refresh mmperbaharui 
halamannya maka client menuju ke server get /api/users/ utk check apakah token user
yg login asih valid 
atau pada saat user mau login pasti dikirim token ke server 
jadi kondisi stlah login pun demikian pada saat user pindah halaman etc
maka kondisi trsbut refresh shingga usAuthenticated = null ,
utk itu secara terus menerus client harus melakukan check apakah token masih valid?
di check :get /api/users/

jika sudah tidak valid maka didelete itu token di localstorage dan diredirect nanati 
utk logout sehinga user harus login lagi pada deaultnya state loading = true


*/
