//kita buatuh pakai axios

import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADER,
  AUTH_ERROR,
} from './type';
//import setAlert action yg mrupakan funct utk set message alert pada component di frontEnd
import { setAlert } from './alert';
import setAuthToken from './utils/auth';
//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // wraping headernya dgn token di localstorage
  }
  try {
    //dispacth token ke auth route
    //kirim aut
    const res = await axios.get('/api/auth'); //note axios tadi uda keisi
    // header & token dari lokal storage yg di  bungkus header
    dispatch({
      //dispatch ke reducer
      type: USER_LOADER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

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
