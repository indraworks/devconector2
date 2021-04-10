import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_GITREPOS,
 
} from './type';

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

//kita akan mendisplaykan semua profile
//untuk itu kita get semua profilenya dulu
export const getProfiles = () => async (dispatch) => {
  //sebelumnya dispatch dulu clear profiles sblum ambil semua
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile');
    console.log('res_data', res.data);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message },
      //ini err adalah yg dari catch
    });
  }
};

//get profile byUserId bukan profileId nya
export const getProfilesById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
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

//github repository ambil berdasarkan namanya
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_GITREPOS,
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
    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger'))); //ini variable error dlm kalang
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
      //ini err adalah yg dari catch
    });
  }
};

//edit profile
export const addExperience = (formData, history, edit = true) => async (
  dispatch
) => {
  try {
    //config idpakai pada saat kita send (POST/PUT)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    //mmebritahu pada client alert bahwa profile dicreate /edit
    dispatch(setAlert('Experience Added', 'success'));
    if (!edit) {
      //jika dia tidak diedit atau dicareated
      //maka dipush ke datsboard page
      history.push('/dashboard'); //redirect hanya bisa di pakai di
    }
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//AddEducation , ini 22 nya sama identik hasilnya juga kluarkan action UPDATE_PROFILE
export const addEducation = (formData, history, edit = true) => async (
  dispatch
) => {
  try {
    //config idpakai pada saat kita send (POST/PUT)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    //mmebritahu pada client alert bahwa profile dicreate /edit
    dispatch(setAlert('Education Added', 'success'));
    if (!edit) {
      //jika dia tidak diedit atau dicareated
      //maka dipush ke datsboard page
      history.push('/dashboard'); //redirect hanya bisa di pakai di
    }
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete experience cari 'id experience trus delete liat di route apinya di bacakend

export const deleteExperience = (id) => async (dispatch) => {
  //kalau delete gak perlu pakai config/header/authorization sama dgn get satu arrah

  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE, //ttp sama UPDATE_PROFILE
      payload: res.data,
    });
    dispatch(setAlert('successful delete experience', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('successful delete education', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//account deleted

export const deleteAccount = () => async (dispatch) => {
  //setelah selsai buat delete action maka kita buat import ke component actionya
  if (window.confirm('Are you sure? this Can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED, //account delete tidak ada di prfile ada di auth_reducers
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
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

/*
ukt memdisplay semua profile kita ambil:
 getPorfiles smua profile
 gihubs dari profile2



*/
