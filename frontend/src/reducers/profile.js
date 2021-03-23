import { GET_PROFILE, PROFILE_ERROR } from '../actions/type';

const initialState = {
  profile: null,
  profiles: [], //utnuk tampung profile smua user login
  repos:[],
  loading: true,
  error: {},
};

const profileReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        //update sluruh state
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
};
export default profileReducers;
