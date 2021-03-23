import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './type';

export const getCurrProfile = () => async (dispatch) => {
  //  const config= {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
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
      payload: { msg: err.response.statusText, status: err.response.response },
    });
  }
};
