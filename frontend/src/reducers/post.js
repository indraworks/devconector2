import { GET_POSTS,POST_ERROR } from '../actions/type';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function getPosts(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

/*
urutanya tetap sama yaitu mmbuat reducer dulu daftarkan di indexnya 
setelahnya create actionya dan 

*/
