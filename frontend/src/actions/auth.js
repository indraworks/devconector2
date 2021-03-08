//kita buatuh pakai axios

import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './type';
//import setAlert action yg mrupakan funct utk set message alert pada component di frontEnd
import { setAlert } from './alert';
import setAuthToken from '../utils/utils';

//Load User ini akan di ativkan di App.js
//dgn pakai cara useEffect yg equal dgn class comp componentDidMount(){}
//manggil sklai  diatifkan pas frontend refrest /pada saat stlah login /register
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//User_Loaded

//Register user
//yg di krimm btuk object trdiir dari {name,emal,password}
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  //buat config utk aiosnya
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //buat body/data utk axiosnya
  const body = JSON.stringify({ name, email, password });

  //sending data lwat axios k server end poit /api/users
  try {
    const response = await axios.post('/api/users', body, config);
    //jika sucess dispatch pilihan type ke reducer :EGISTER_SUCCESS
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data, //jika success maka yg di kiim ke state adalah response data
      //hasil data adalah update dari server
    });
    dispatch(loadUser()); //stlah success langsung check auth token
  } catch (err) {
    //jika fail dispatch pilihan type ke reducer :EGISTER_FAIL
    dispatch({
      type: REGISTER_FAIL,
    });
    //yg dikirim gak ada payload kita dispatch setAlert sblumnya kita import dulu
    //function action ini dari actions/alert supaya update component utk alertnya
    //beritahu user register gagal dgn tampilkan alert msg dari error
    //kita ambil response dari server tanmpung di variable
    const errors = err.response.data.errors;
    //jika errr ada datanya
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

/// tinggal kita copy dari register,login note:sama dgn register tinggal ganti gak pake name ////

export const loginUser = ({ email, password }) => async (dispatch) => {
  //buat config utk aiosnya
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //buat body/data utk axiosnya,stringify convert dari object ke  string kalau dari client ke server
  const body = JSON.stringify({ email, password });

  //sending data lwat axios k server end poit /api/users
  try {
    const response = await axios.post('/api/auth', body, config);
    //jika sucess dispatch pilihan type ke reducer :EGISTER_SUCCESS
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data, //jika success maka yg di kiim ke state adalah response data
      //hasil data adalah update dari server
    });
    dispatch(loadUser()); //stlah success langsung check auth token
  } catch (err) {
    //jika fail dispatch pilihan type ke reducer :EGISTER_FAIL
    dispatch({
      type: LOGIN_FAIL,
    });

    const errors = err.response.data.errors;
    //jika errr ada datanya
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

//stlah ini action kita gabung ke component register dgn import connect reac redux
//import {registerUser} from '../../actions/auth
//kmudian kita set connect paling bawah dan isi tambahkan action auth di connect(registeruser )(Register)
//tambahkan  di const REgister =({register})

/*
Keterangan JSON.Stringify  ---->kasih data keserver maka data harus bentuknnya String
A common use of JSON is to exchange data to/from a web server.

When sending data to a web server, the data has to be a string.

Convert a JavaScript object into a string with JSON.stringify().

/// JSON.parse  --->terima data dari server maka data harus di cobnver jadi object

When receiving data from a web server, the data is always a string.

Parse the data with JSON.parse(), and the data becomes a JavaScript object.

*/
