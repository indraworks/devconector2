//auth reducer berisi autentikasi untuk registrasi dan login
import {
  FAIL_REGISTER,
  SUCCESS_REGISTER,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
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
    case SUCCESS_REGISTER:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state, //dispreate state
        ...action.payload, //dispreated payload
        isAuthenticated: true,
        loading: false,
      };
    case FAIL_REGISTER:
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case CLEAR_PROFILE:
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
