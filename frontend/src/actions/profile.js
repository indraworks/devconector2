import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './type';

export const getCurrProfile = () => async (dispatch) => {
  //  } //kalau get gak perlu pakai headers
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create or edit prfoile jadi create dan update jadi 1
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    //config idpakai pada saat kita send (POST/PUT)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //ini 2x action pertama create Profilenya ,kedua adalah getProfile
    //hasil dari yg barusan dicreate
    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    //mmebritahu pada client alert bahwa profile dicreate /edit
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      //jika dia tidak diedit atau dicareated
      //maka dipush ke datsboard page
      history.push('/dashboard'); //redirect hanya bisa di pakai di
    }
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(err.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/*
catatan utk createProfile action itukan raoutenya hasrus masuk middleware
dulu di action ini kok tidak ada tokenna?tokennya sudah ada 
yatiu pada saat refres otomatis dibangkitkan dari useloader
send token dari app.js di useEffect()
jadi disni utk createProfile hanya passing formdata,config header srta 
param edit apakah kondisi false atau true yg amsuk di function ini sbgai parameter
utk jika berhasil create ---> maka di action GET_PROFILE 
                              data di tampung di payload



urk pada saat error maka didispatch action PROFILE ERROR
tak lupa send alert apa isi error tersebut 


*/