import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
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
    case GET_POSTS: //plural
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], //ada d dalam array jadi posts ini adalah aray lia diatas
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.post_id
            ? { ...state, likes: payload.likes }
            : post
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
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
            //kculai yg uda didelete statenya tidak usah ditmapilkan krn uda deleted di server
          ),
        },

        loading: false,
      };
    //payoad sudah berisi comment_id yg didelete

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

/*
isi add coment di backend
try {
      //req.user.id dari auth didicode di middleware
      const user = await User.findById(req.user.id); //user yg kasih comment
      const post = await Post.findById(req.params.id); //cari id post di dtabase

      const newComment = {
        text: req.body.text, //from input form
        name: user.name, //dari dattabase
        avatar: user.avatar, //dari database
        id: req.user.id, //from inputform ==> auth wihc decoded by jwt dari user yginputin data
      };




      //masukan ke dalam comment fields yg berupa aray krn id post  sudah ktmu diatas
      //dari req.params.id
      //link bacaan :https://alligator.io/js/push-pop-shift-unshift-array-methods/
      post.comments.unshift(newComment); //masukan di fields commenst(yg brerupa aaarray) di table post
      //unshift artinya tmbahkan di paling awal array (selalu)
      //yg id post udah didapat dari atas findbyid(req.params.id)

      await post.save();
      res.json(post.comments); // yg dikirim balik adalah comment ya ke client
      post.comemtns jadi brupa aarray  object comments 
      bisa dilihat di models:
      comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],


*/
