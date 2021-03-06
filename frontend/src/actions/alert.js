import { SET_ALERT } from './type';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch(
    //isi disptach adalah .type dan payload yg dikirimakan ke reducers
    {
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
      },
    }
  );
};
