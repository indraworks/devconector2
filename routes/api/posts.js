//mmbuat routes utk posts
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
//mongoose data

const Post = require('../../models/Post');

const User = require('../../models/User');

const Profile = require('../../models/Profile');
const { restart } = require('nodemon');

//@route   POST api/posts
//@desc    Test route
//@access  private buth auth middleware

router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erorrs: errors.array(),
      });
    }

    try {
      //cari user id brdsarakn req.user.id dari frontend
      const user = await User.findById(req.user.id).select('-password');
      //masukan newPost kedalma database newpost baru
      const newPost = new Post({
        //create instatiate field schema
        text: req.body.text, //brsdarkan form imputan form
        name: user.name, //dari database
        avatar: user.avatar, //dari database
        user: req.user.id, //dari user id broser/brdasar inputan
      });
      //sav post
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

/*
catatan pengisian waktu ngisi posts kan datase model post kan ada like ada coment 
yg mana comenct trdiri atas object user( relasinya ) dan object_id dari user yg isi coment ,text ( isi 
  commentnya),name,avatar,date 
jadi gini ya ini kalau noSQL beda sama dgn SQL server/postgress kalau ngisi posts maka smua field mesti diisi
kalau di table relasi biasa ini kan jadi banyak skali yg kosong fieldnya akan tetapi utk nSQL ini 
adalah document saja gak masalah jadi waktu ngisi posts atau new post yg disii hanya 
user_id(objid releasi),avatar,etxt(post) ,name(nama user yg ngisi post/owner post),avatar(avartar user)

jadi yg like masih kosong ,like diisi userId yg ngelike post tsb
isi model post di db:
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
 likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
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
  date: {
    type: Date,
    default: Date.now,
  },
 TERLIHAT DIATAS BAHWA 
*/

//@route   GET api/posts
//@desc    Test route
//@access  private buth auth middleware
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/posts/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check post base on id

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DElETE  api/posts/:id
//@desc    Test route
//@access  private buth auth middleware
// note : delete berdasarkan user id yg ngepost content tsb

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //sengaja di kasih nama id post
    if (!post) {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(post.user, 'hello');
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send({
        msg: 'not atuhorized to delete this post',
      });
    }
    await post.remove();
    res.json({ msg: 'post remove' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        msg: 'post by user id  not found',
      });
    }
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//ini utk post like dan unlike
//@route   api/posts/like/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check put /update like by user id kalo sudah ada mmaka tidak
//akan bertambah lagi

router.put('/like/:id', auth, async (req, res) => {
  //ini :id adalah id dari postId -nya
  //yg dilike oleh si user_id
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({
        msg: 'not found the id',
      });
    }
    if (
      //jika ktmu filter ariable like apa ada user yg lebih dari 1x like
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'user already like this post', //jika sudah pernah gak bisa like
      });
    }
    //didalam likes ada :likes:[{ user}] //dimana user typedatanya adalah relasi dari objid table user
    /*
    likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
    */
    post.likes.unshift({ user: req.user.id }); //jika belum maka likes diisi dgn user_id yg like
    //unshift adalah menambah/mengisi paling depan /insert
    await post.save(); //kmudian post diupdate databasnya
    //nah pada saat acation dgn reducer ini kan dijalankan route ini
    //dan dikerjakan isinya route ini karena melayani action reducer dalam hal ini adalah
    // UPDATE_LIKES
    //nah yg dikembalikan oleh UPDATE_LIKES payloadnya adalag
    //res.json(post.likes) yg mana sama dgn isinya res.data
    //dari axios.put(/api/post/likes/${post_id}) 
    //isinya adalah nilai req.user.id  ==>user id yg lagi login
    // diaction payload: { post_id, likes: res.data },
    //diterima direducer update state { ...state,likes:payload.likes} //payload.likes artinya = res.data yaitu req.user.id
    //yg artinya userid yg saat itu sedang login 
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: 'server error',
    });
  }
});
/*
adi gini cerita tentang like atau unlike ,ktika ada user masuk logiin misalkan si a login 
nah dia like postingnyanya si b maka yg terjadi adalah:
bgini dari awal yaitu smua yg di getpost postnay itu smua mucnul di menu post 
nah pas kita tekan like kita menuju pada id yg ada dari post tsb 
nah maka diarahkan ke route ini ,diroute ini 



*/

//ini post unlike
//@route   api/posts/unlike/:id
//@desc    Test route
//@access  private buth auth middleware
// note : check put /update unlike by user id

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.map((like) => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({
        msg: 'no post that avalailble to unlike',
      });
    }
    //cari req.user.id index dalam array likes masuk variable
    const findIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    //dari variable ini kita delete
    post.likes.splice(findIndex, 1);
    //update dgn mengesavenya
    await post.save();
    res.json({
      msg: `${req.user.id} already remove`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: 'sever error',
    });
  }
});

// ///////////////////////COMENT ///////////////////////////////////////////////////
// //@route   POST api/posts/comments/:id
// //@desc    Test route
// //@access  private buth auth middleware

router.post(
  '/comment/:id',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        erorrs: errors.array(),
      });
    }
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
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        message: 'server error',
      });
    }
  }
);

//
// //@route   DELETE api/posts/comment/:post_id/:comment_id
// //                tertulis: api/posts/comment/:id/:comment_id
// //@desc    Test route
// //@access  private buth auth middleware

// Brad ////

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
// router.delete('/comment/:id/:comment_id', auth, (req, res) => {
//   Post.findById(req.params.id)
//     .then((post) => {
//       // Check to see if comment exists
//       if (
//         post.comments.filter(
//           (comment) => comment._id.toString() === req.params.comment_id
//         ).length === 0
//       ) {
//         return res
//           .status(404)
//           .json({ commentnotexists: 'Comment does not exist' });
//       }

//       // Get remove index
//       const removeIndex = post.comments
//         .map((item) => item._id.toString())
//         .indexOf(req.params.comment_id);

//       // Splice comment out of array
//       post.comments.splice(removeIndex, 1);

//       post.save().then((post) => res.json(post));
//     })
//     .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
// });

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.comments.filter(
        //karena id ini  integer kalau yg masuk form req.params.coment_id atau req.params.id itu string!
        (item) => item._id.toString() === req.params.comment_id //hrus to string kalau gak gak bisa!
      ).length === 0
    ) {
      return res.status(404).json({
        msg: 'the comment you search not Found!',
      });
    }
    //excusi delete
    //ubah dulu smua id ke dalam string id dari comments ,kmudian cari indx dari
    //index dari comment_id yg tadi dimasukan lewat req.params.comment_id
    //sbb jika ada maka id dari comment_id pasti ada di fields array comments {}
    //baru di dielete coment_id yg sudah ktmu idx ya tsb.
    const deleteIdx = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);
    post.comments.splice(deleteIdx, 1); //delete element array di comments{} brdasarkan index
    await post.save();
    res.json(post);
  } catch (err) {
    return res.status(500).json({
      msg: 'server error',
    });
  }
});

module.exports = router;

/*
penjelasan pada put likes :
di model utk post.lieks.user ini isinya adalah objectId yg direferensikan 
pada id_user yg like yg berasal dari req.user.id 
pada saat auth midleware ini token dibuka isi user adalah user.id dan user.name
nah ini yg jadi acuan pada saat kita filter apakah user yg like di dalam array likes
ini 
post.likes.filter((like) => like.user.toString() === req.user.id).length > 0

models pistS  dgn schema likes:
likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],s

///Penjelsaan unlike sam adgn like 
error kalau dia udah ==0 gak yg didileike lagi 
nah ita cari  dgn tampung variable index dari indexOf(req.user.id ) kit acari index dari userUd yg ada di araray likes
nah stlah masuk variable kita tinggal remove aja bersarkan variableIndex tadi 
coment kita ccpy dari post





*/

/*

penjelasan coment ini sama dgn post hanya kalau post simpnanya didatabase
kalau coment bentuknya object disimpan dalam aarray object


*/

/*
s always, the choice between map() and forEach() 
will depend on your use case. If you plan to change, 
alternate, or use the data, you should pick map(), 
because it returns a new array with the transformed data.

But, if you won't need the returned array, don't use map() 
- instead use forEach() or even a for loop.

*/
