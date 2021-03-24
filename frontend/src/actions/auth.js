import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from './type';
import { setAlert } from '../actions/alert';
//inport utils
import setAuthToken from '../utils/setAuthToken';

////Loader ////
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
////end loader ///////
//"access-control-allow-origin": "*"
/////Register /////
export const register = ({ name, email, password }) => async (dispatch) => {
  const newUser = {
    name,
    email,
    password,
  };
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      //gak perlu pake authorization
    },
  };
  const body = JSON.stringify(newUser);

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    //jika error maka inport setAlert kita dispatach sama sperti alert di landingpage
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

///Login ////
export const login = ({ email, password }) => async (dispatch) => {
  const user = {
    //padda es6 jika variable dgn nilai dari passing parameter sama maka bisa
    //ditulis sekali
    // email:email,
    // password:password,
    email,
    password,
  };
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      //gak perlu pake authorization
    },
  };
  const body = JSON.stringify(user);

  try {
    const res = await axios.post('/api/auth', body, config);
    // console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //res.data isinya adalah token
    });
    dispatch(loadUser());
  } catch (err) {
    //jika error maka inport setAlert kita dispatach sama sperti alert di landingpage

    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

//logout

export const logout = () => (dispatch) => {
  //1 dispatch mewakili 1 action type
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};

//////CATATAN ////////////
/*USER_LOADER keterangan 
kita login kita udah dapat token jika success
register sucess maka harus ada loader kita get token apa token kita valid apa tidak 
dan disimpan di localsotorage shabis register /login atau slama user signin 
(jika ada batas waktu tokennya)

langkah2 di action type buat type state jika sucess send USER_LOADED 
                                        jika error send AUTH_ERROR
kita buat function utils yg mana jika ada token langsun gkit agabubg tokennya
di dalam header utk di send ke server ,.method :get  /api/users/auth
supya ngcek token kit adan decode isi payload token berupa ( id,username,email)
dan di save di local storage 
kita taruh di utils/setAuthToken.js  --.function yg berisi passing token
kmudian function tsb mnirma argument token jika ada token maka 
di set gabungin token di header 
jika gak ada token maka header didelete
export ini function supaya diimport di loader Action,
kmudian kit agunakan axios utk conect metod get hasil respoonse di tampung di variable res
   try{
     const res = await axios('/api/users/auth,config);
     //jika berhasil kita send ke reducer payload nya yaitu res
     //kita dispatch
        dispatch({
          type:USER_LOADED,
          payload:res.data
        })
   } catch(err) {
      dispatch({
        type:AUTH_ERROR
      })

   }
di reducer kita tinggal update statenya 
  case USER_LOADED:
    return {
      ...state,
      isAutenthicate:true,
      loading:false,
      user:action.payload
    }

pada App.js    
kita masukan nnati utk check user_loaded ini di app
pertama kita copy setAuthToken(localStorage.token) di taruh di app.js
import util/setAuthToken.js dari /utils

kmudian kita gunakan useEfect dan dispatch dari store utk send userLoad
jadi stiap user yg active saat refresh selalu kirim utk get /api/server/auth 
pastikan dia masih valid tokennya kalau tidak maka otomatis nnti log out


*/
/*
Penjelasan isAuthenticated ,USER_LOADED,redirect
setelah action.type  USER_LOADED diterima oleh reducer maka di aset isauthentaticated
yg dulumya false menjadi true

ini maka akan akibatkan state isAuthenticated dari false jadi true 
utk itu state ini yg kita pakai utk redirect dari register page ke login
atau dari login menuju ke dahsbaord page!


*/

/* PENJELASAN LOGIN : adalah authentication & dapatin token dari server
Penjelasan Login ingat ya login itu utk authentication 
jadi kita masukan email password server cari email kita 
jika ketmu maka ok di validasi password kita dgn bcrypt.compare(pwd dari req.body,dtabase) =ismatch
jika true atau match maka kita masukan info utk authentasi pada token biar di crypt
tadi pada masukan login kan cari email kita nah pada saat finOne ditaabse ketmu 
maka info satu field didapat didatabase di simpan di variable user
const user = User.findOne({email} ) //yg ada di user = {_id,name,email,passowrd}
nah sesudahnya user ini kit amauskan ke variable sebut saja payload
utk apa utk di encrypt /scramble bersama denga jwtSecret (isinya key yg ada di file env)
+ dgn waktu berlakunya token ini jadi 
jadi ingat pertama 
  jika valid password  dan kita uda dapat info dari field maka kita masukan 
   data kedala variable payload ,nah terserah data apa saja yg dimasukan dari satu field tadi 
   dari varaibel user 
   disini(dlm contoh ini) kita masukan id sama name saja 
       const payload = {
         user:{id:user._id}
       }
   kmudian kita cryot dgn function buildin jwtsign
   jwt.sign(payload,config.get('jwt.secret'),(err,toke)=> {
     if(err) Throw(err)
     res.json(token) //nah ini yg di kembalikan client pada saat login 
   })
 nah sekarang liat diredux pada saat success state apa yg dilakukan yaitu :
      karena token di send ke kita dari serve
    - save token di localstorage,
     -redirect ke Dasboard 

*/
