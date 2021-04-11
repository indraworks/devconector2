import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
} from '../actions/type';

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
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? { ...state, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state, //gefilter bahwa id yg udah didelete tak perlu ditamplikan
        posts: state.posts.filter((post) => post.id !== payload),
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
/*
keterangan utk UPDATE_LIKES ,jadi jika ada yg ngelikes maka akan dimasukan request.user.id 
di array post.likes ( post adalah object isinya ada likes yg array utk stateya )
nah tadai kan ngisi post_id di payload nah skrgn disini kita update stateya dulu trus cari itu apa ada idnya 
jika kemu maka kita update statenya dan kita isi likes atau post.likes dgn payload.likes
sbnarnya kan hanya payload kalalu ngisinya di post tapi yg diisi adalah likes yg under dari 
psot atau object variablenya post maka harus diisi dgn payload.likes

posts: state.posts.map(post=>post._id === payload._id?
  ({...state,likes:payload.likes}):(post))


*/
